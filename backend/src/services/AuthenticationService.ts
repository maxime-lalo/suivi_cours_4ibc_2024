import UserCreateRequestResource from "common/User/UserCreateRequestResource";
import DbClient from "../database/DbClient";
import bcrypt from "bcrypt";
import UserLoginRequestResource from "common/User/UserLoginRequestResource";
import jwt from "jsonwebtoken";
import UserResponseResource from "common/User/UserReponseResource";

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
	public register(user: UserCreateRequestResource) {
		return this.dbClient.user.create({
			data: {
				email: user.email,
				name: user.name,
				password: bcrypt.hashSync(user.password, 10),
			},
		});
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

		const userHydrated = UserResponseResource.hydrate<UserResponseResource>(user);
		return jwt.sign(
			{
				...userHydrated,
			},
			process.env.JWT_SECRET!,
			{
				expiresIn: "1h",
			},
		);
	}
}
