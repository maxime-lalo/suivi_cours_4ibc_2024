import UserCreateRequestResource from "common/User/UserCreateRequestResource";
import DbClient from "../database/DbClient";
import bcrypt from "bcrypt";
import UserLoginRequestResource from "common/User/UserLoginRequestResource";
import jwt from "jsonwebtoken";
import JwtResponseResource from "common/Authentication/JwtResponseResource";
import crypto from "crypto";

export default class AuthenticationService {
	private static authenticationService: AuthenticationService;
	private dbClient: DbClient = DbClient.getInstance();

	public static getInstance() {
		if (!this.authenticationService) {
			this.authenticationService = new AuthenticationService();
		}
		return this.authenticationService;
	}

	// npm i bcrypt
	// npm i --save-dev @types/bcrypt
	public async register(user: UserCreateRequestResource) {
		const userCreated = await this.dbClient.user.create({
			data: {
				messageToSign: `Welcome to our platform ${user.name}, please sign this to connect :  ${crypto.randomBytes(20).toString("hex")}`,
				email: user.email,
				name: user.name,
				password: bcrypt.hashSync(user.password, 10),
			},
		});

		const userHydrated = JwtResponseResource.hydrate<JwtResponseResource>(userCreated);
		return this.generateJwt(userHydrated);
	}

	// npm i jsonwebtoken
	public async login(userResource: UserLoginRequestResource) {
		const user = await this.dbClient.user.findFirst({
			where: {
				email: userResource.email,
			},
		});

		if (!user) return null;

		if (!bcrypt.compareSync(userResource.password, user.password)) return null;

		const userHydrated = JwtResponseResource.hydrate<JwtResponseResource>(user);
		return this.generateJwt(userHydrated);
	}

	public generateJwt(user: JwtResponseResource) {
		return jwt.sign(
			{
				...user,
			},
			process.env.JWT_SECRET!,
			{
				expiresIn: "1h",
			},
		);
	}

	public async verifyWallet(email: string, walletAddress: string) {
		return this.dbClient.user.update({
			where: {
				email,
			},
			data: {
				walletAddress,
				messageToSign: "",
			},
		});
	}
}
