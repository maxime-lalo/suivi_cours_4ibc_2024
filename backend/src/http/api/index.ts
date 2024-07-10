import express, { Router } from "express";
import v1 from "./v1";

export default (superRouter: Router) => {
  const router = express.Router();

  superRouter.use("/api", router);

  v1(router);
};
