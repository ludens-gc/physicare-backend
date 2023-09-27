import { Router } from "express";
import AuthController from "../controllers/authController.js";

const router = Router();

router
  .post("/public/login", AuthController.loginUser)
  .post("/public/register", AuthController.registerUser);

export default router;
