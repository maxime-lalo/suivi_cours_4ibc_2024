import express, { CookieOptions, Router } from "express";
import ApiResponses from "../ApiResponses";
import UserCreateRequestResource from "common/User/UserCreateRequestResource";
import RequireBodyValidation from "../../middlewares/RequireBodyValidation";
import UserResponseResource from "common/User/UserReponseResource";
import RequireEmailNotExists from "../../middlewares/RequireEmailNotExists";
import AuthenticationService from "../../../services/AuthenticationService";
import UserLoginRequestResource from "common/User/UserLoginRequestResource";
import VerifyWalletRequestResource from "common/Authentication/VerifyWalletRequestResource";
import RequireJwtAuthentication from "../../middlewares/RequireJwtAuthentication";
import BlockchainService from "../../../services/BlockchainService";
import JwtResponseResource from "common/Authentication/JwtResponseResource";
import assert from "assert";
export const cookieJwtOptions: Readonly<CookieOptions> = {
	httpOnly: false,
	path: "/",
	secure: true,
	sameSite: "none",
	expires: new Date(Date.now() + 1000 * 60 * 60 * 48), // 48h
};

export default (superRouter: Router) => {
	const router = express.Router();

	superRouter.use("/auth", router);

	// Tester sur :
	// http://localhost:3001/api/v1/user
	router.post("/register", RequireBodyValidation(UserCreateRequestResource), RequireEmailNotExists(), async (req, res) => {
		const token = await AuthenticationService.getInstance().register(req.body);
		res.cookie("accessToken", token, cookieJwtOptions);
		return ApiResponses.httpCreated(res, {
			accessToken: token,
		});
	});

	router.post("/login", RequireBodyValidation(UserLoginRequestResource), async (req, res) => {
		const token = await AuthenticationService.getInstance().login(req.body);
		if (!token) return ApiResponses.httpUnauthorized(res, "Invalid email or password");
		res.cookie("accessToken", token, cookieJwtOptions);
		return ApiResponses.httpSuccess(res, {
			accessToken: token,
		});
	});

	router.post("/verify-wallet", RequireBodyValidation(VerifyWalletRequestResource), RequireJwtAuthentication(), async (req, res) => {
		const user = (req.body as any).user as JwtResponseResource;
		assert(user.messageToSign, "messageToSign is required");

		const isSignatureValid = await BlockchainService.getInstance().verifySignature(user.messageToSign, req.body.signature, req.body.walletAddress);
		if (!isSignatureValid) return ApiResponses.httpBadRequest(res, "Invalid signature");

		const token = AuthenticationService.getInstance().generateJwt(
			JwtResponseResource.hydrate<JwtResponseResource>({
				...user,
				walletAddress: req.body.walletAddress,
			}),
		);
		res.cookie("accessToken", token, cookieJwtOptions);
		return ApiResponses.httpSuccess(res, {
			accessToken: token,
		});
	});
};
