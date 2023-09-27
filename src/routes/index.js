import express from "express";
import cors from "cors";
import users from "./usersRoutes.js";
import auth from "./authRoutes.js";

const routes = (app) => {
  app.route("/").get((req, res) => {
    res.status(200).send({ title: "Physicare API" });
  });

  app.use(cors(), express.json(), auth, users);
};

export default routes;
