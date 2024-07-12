import express, { CookieOptions, Router } from "express";
import ApiResponses from "../ApiResponses";
import UserCreateRequestResource from "common/User/UserCreateRequestResource";
import RequireBodyValidation from "../../middlewares/RequireBodyValidation";
import UserResponseResource from "common/User/UserReponseResource";
import RequireEmailNotExists from "../../middlewares/RequireEmailNotExists";
import AuthenticationService from "../../../services/AuthenticationService";
import UserLoginRequestResource from "common/User/UserLoginRequestResource";

export const cookieJwtOptions: Readonly<CookieOptions> = {
	path: "/",
	sameSite: "none",
	expires: new Date(Date.now() + 1000 * 60 * 60 * 48), // 48h
};

export default (superRouter: Router) => {
	const router = express.Router();

	superRouter.use("/auth", router);

	// Tester sur :
	// http://localhost:3001/api/v1/user
	router.post("/register", RequireBodyValidation(UserCreateRequestResource), RequireEmailNotExists(), async (req, res) => {
		const user = await AuthenticationService.getInstance().register(req.body);
		return ApiResponses.httpCreated(res, UserResponseResource.hydrate<UserResponseResource>(user));
	});

	router.post("/login", RequireBodyValidation(UserLoginRequestResource), async (req, res) => {
		const token = await AuthenticationService.getInstance().login(req.body);
		if (!token) return ApiResponses.httpUnauthorized(res, "Invalid email or password");
		res.cookie("accessToken", token, cookieJwtOptions);
		return ApiResponses.httpSuccess(res, {
			accessToken: token,
		});
	});
};
