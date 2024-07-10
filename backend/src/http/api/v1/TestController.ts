import express, { Router } from "express";
import ApiResponses from "../ApiResponses";
import AddZerosToId from "../../middlewares/AddZerosToId";

export default (superRouter: Router) => {
  const router = express.Router();

  superRouter.use("/test", router);

  router.get("/", (req, res) => {
    res.send("Hello world");
  });

  // http://localhost:3001/api/v1/test
  router.post("/", (req, res) => {
    throw new Error("Error");
    res.send(req.body);
  });
  //localhost:3001/api/v1/test/55857
  router.post("/:id", AddZerosToId(), (req, res) => {
    return ApiResponses.httpCreated(res, req.params);
  });
};
