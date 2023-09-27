import { PrismaClient } from "@prisma/client";
import pkg from "bcryptjs";
import { v4 } from "uuid";

const { hash } = pkg;
const prisma = new PrismaClient();

class UserService {
  getAllUsers = async () => {
    try {
      const users = await prisma.users.findMany();
      return users;
    } catch (error) {
      throw new Error(error);
    }
  };
  getUserByID = async (userId) => {
    try {
      const user = await prisma.users.findUnique({
        where: {
          id: userId,
        },
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };
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
  updateUserByID = async (userId, dataObject) => {
    try {
      if (dataObject.password) {
        dataObject.password = await hash(dataObject.password, 8);
      }
      const user = await prisma.users.update({
        where: {
          id: userId,
        },
        data: dataObject,
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };
  deleteAllUsers = async () => {
    try {
      const result = await prisma.users.deleteMany();
      return result;
    } catch (error) {
      throw new Error(error);
    }
  };
  deleteUserByID = async (userId) => {
    try {
      const user = await prisma.users.delete({
        where: {
          id: userId,
        },
      });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  };
}

export default UserService;
