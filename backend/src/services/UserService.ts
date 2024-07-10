import DbClient from "../database/DbClient";

export default class UserService {
	private static userService: UserService;
	private dbClient: DbClient = DbClient.getInstance();

	public static getInstance() {
		if (!this.userService) {
			this.userService = new UserService();
		}
		return this.userService;
	}

	public async existsById(id: number): Promise<boolean> {
		return !!(await this.dbClient.user.findFirst({
			select: { id: true },
			where: {
				id,
			},
		}));
	}

	public getById(id: number) {
		return this.dbClient.user.findUniqueOrThrow({
			where: {
				id,
			},
			include: {
				Post: true,
			},
		});
	}

	public getAll() {
		return this.dbClient.user.findMany({
			include: {
				Post: true,
			},
		});
	}
}
