import express, { Router } from "express";
import ApiResponses from "../ApiResponses";
import BlockchainService from "../../../services/BlockchainService";
import RequireBodyValidation from "../../middlewares/RequireBodyValidation";
import SetValueRequestResource from "../../../../commons/BasicContract/SetValueRequestResource";

export default (superRouter: Router) => {
	const router = express.Router();

	superRouter.use("/blockchain", router);

	router.get("/", async (req, res) => {
		return ApiResponses.httpSuccess(res, await BlockchainService.getInstance().getBlockNumber());
	});

	// http://localhost:3001/api/v1/blockchain/wallet-address
	router.get("/wallet-address", (req, res) => {
		return ApiResponses.httpSuccess(res, BlockchainService.getInstance().getWalletAddress());
	});

	router.get("/balance", async (req, res) => {
		return ApiResponses.httpSuccess(res, await BlockchainService.getInstance().getBalance());
	});

	router.get("/get-value", async (req, res) => {
		return ApiResponses.httpSuccess(res, await BlockchainService.getInstance().getContractValue());
	});

	router.post("/set-value", RequireBodyValidation(SetValueRequestResource), async (req, res) => {
		const value = req.body.value;
		return ApiResponses.httpSuccess(res, await BlockchainService.getInstance().setContractValue(value));
	});

	router.post("/set-payable-value", RequireBodyValidation(SetValueRequestResource), async (req, res) => {
		const value = req.body.value;
		return ApiResponses.httpSuccess(res, await BlockchainService.getInstance().setPayableValue(value));
	});
};
