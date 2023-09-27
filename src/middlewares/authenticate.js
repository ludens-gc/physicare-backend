import pkg from "jsonwebtoken";

const { verify, decode } = pkg;

export default async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).send("Access token não informado");
  }

  const [, accessToken] = token.split(" ");

  try {
    verify(accessToken, process.env.JWT_SECRET);
    const { id, email } = await decode(accessToken);
    req.userId = id;
    req.userEmail = email;
    return next();
  } catch (error) {
    res.status(401).send("Usuário não autorizado");
  }
};
