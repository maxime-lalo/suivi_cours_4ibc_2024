import express, { Router } from "express";
import TestController from "./TestController";
import UserController from "./UserController";
import BlockchainController from "./BlockchainController";

export default (superRouter: Router) => {
	const router = express.Router();

	superRouter.use("/v1", router);

	TestController(router);
	UserController(router);
	BlockchainController(router);
};
