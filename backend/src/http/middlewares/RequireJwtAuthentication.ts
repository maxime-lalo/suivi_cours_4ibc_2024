import UserResponseResource from "common/User/UserReponseResource";
import { NextFunction, Request, Response } from "express";
import ApiResponses from "../api/ApiResponses";
import jwt from "jsonwebtoken";

export interface RequestBodyWithUser extends Request {
	body: {
		user: UserResponseResource;
	};
}
export default function RequireJwtAuthentication() {
	return async (request: RequestBodyWithUser, response: Response, next: NextFunction) => {
		const accessToken = (request.cookies["accessToken"] ?? "").trim();
		if (!accessToken) return ApiResponses.httpUnauthorized(response, "Unauthorized");

		// Check if token is valid
		try {
			const decodedJwt = jwt.verify(accessToken, process.env.JWT_SECRET!);
			request.body.user = decodedJwt as UserResponseResource;
			next();
		} catch (e) {
			return ApiResponses.httpUnauthorized(response, "Unauthorized");
		}
	};
}
