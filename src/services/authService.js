import { PrismaClient } from "@prisma/client";
import pkgBcryptjs from "bcryptjs";
import pkgJsonwebtoken from "jsonwebtoken";
import { v4 } from "uuid";

const { compare, hash } = pkgBcryptjs;
const { sign } = pkgJsonwebtoken;

const prisma = new PrismaClient();

class AuthService {
  registerUser = async (dataObject) => {
    const user = await prisma.users.findUnique({
      where: {
        email: dataObject.email,
      },
    });
    if (user) {
      throw new Error("Usuário já cadastrado.");
    }
    try {
      dataObject.password = await hash(dataObject.password, 8);
      const newUser = await prisma.users.create({
        data: {
          id: v4(),
          name: dataObject.name,
          email: dataObject.email,
          password: dataObject.password,
        },
      });
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  };

  loginUser = async (dataObject) => {
    const user = await prisma.users.findUnique({
      where: {
        email: dataObject.email,
      },
      select: {
        id: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      throw new Error("Usuário não cadastrado");
    }

    const isEqualPasswords = await compare(dataObject.password, user.password);

    if (!isEqualPasswords) {
      throw new Error("Senha inválida");
    }

    const accessToken = sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 86400,
      },
    );

    return { accessToken };
  };
}

export default AuthService;
