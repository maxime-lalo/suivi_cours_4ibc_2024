import express, { Router } from "express";
import ApiResponses from "../ApiResponses";
import UserCreateRequestResource from "common/User/UserCreateRequestResource";
import { ValidationError } from "class-validator";
import RequireBodyValidation from "../../middlewares/RequireBodyValidation";
import UserService from "../../../services/UserService";
import UserResponseResource from "common/User/UserReponseResource";
import { Request } from "express";

interface RequestWithParamId extends Request {
	params: {
		id: string;
	};
}

export default (superRouter: Router) => {
	const router = express.Router();

	superRouter.use("/users", router);

	// Tester sur :
	// http://localhost:3001/api/v1/user
	router.post("/", RequireBodyValidation(UserCreateRequestResource), (req, res) => {
		return ApiResponses.httpCreated(res, req.body);
	});

	router.get("/", async (req, res) => {
		const users = await UserService.getInstance().getAll();
		return ApiResponses.httpSuccess(res, UserResponseResource.hydrateArray<UserResponseResource>(users));
	});

	router.param("id", async (req, res, next, id) => {
		if (isNaN(parseInt(id))) return ApiResponses.httpBadRequest(res, "Id must be a number");
		if (!(await UserService.getInstance().existsById(parseInt(id)))) return ApiResponses.httpNotFound(res);
		next();
	});

	router.get("/:id", async (req: RequestWithParamId, res) => {
		return ApiResponses.httpSuccess(
			res,
			UserResponseResource.hydrate<UserResponseResource>(await UserService.getInstance().getById(parseInt(req.params.id))),
		);
	});
};
