import assert from "assert";
import { Request, Response, NextFunction } from "express";
import UserService from "../../services/UserService";
import ApiResponses from "../api/ApiResponses";

export default function RequireEmailNotExists() {
	return async (req: Request, res: Response, next: NextFunction) => {
		assert(req.body.email, "Email is required");
		const exists = await UserService.getInstance().emailExists(req.body.email);
		if (exists) return ApiResponses.httpConflict(res, "Email already exists");
		return next();
	};
}
