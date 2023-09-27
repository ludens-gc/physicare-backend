import express from "express";
import UserController from "../controllers/userController.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();
router.use(authenticate);

router
  .get("/users", UserController.getAllUsers)
  .get("/users/id/:id", UserController.getUserByID)
  .post("/users", UserController.registerUser)
  .put("/users/id/:id", UserController.updateUserByID)
  .delete("/users", UserController.deleteAllUsers)
  .delete("/users/id/:id", UserController.deleteUserByID);

export default router;
