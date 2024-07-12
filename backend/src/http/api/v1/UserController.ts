import express, { Router } from "express";
import ApiResponses from "../ApiResponses";
import UserCreateRequestResource from "common/User/UserCreateRequestResource";
import { ValidationError } from "class-validator";
import RequireBodyValidation from "../../middlewares/RequireBodyValidation";
import UserService from "../../../services/UserService";
import UserResponseResource from "common/User/UserReponseResource";
import { Request } from "express";
import RequireEmailNotExists from "../../middlewares/RequireEmailNotExists";
import RequireJwtAuthentication from "../../middlewares/RequireJwtAuthentication";

interface RequestWithParamId extends Request {
	params: {
		id: string;
	};
}

export default (superRouter: Router) => {
	const router = express.Router();

	superRouter.use("/users", RequireJwtAuthentication(), router);

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
