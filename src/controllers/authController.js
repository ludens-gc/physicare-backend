import AuthService from "../services/authService.js";

const authService = new AuthService();

class AuthController {
  static registerUser = async (req, res) => {
    const data = req.body;
    try {
      const user = await authService.registerUser(data);
      res.status(201).send(user);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  static async loginUser(req, res) {
    const { email, password } = req.body;
    try {
      const login = await authService.loginUser({ email, password });
      res.status(200).send(login);
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  }
}

export default AuthController;
