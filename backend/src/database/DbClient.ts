import { PrismaClient } from "@prisma/client";

export default class DbClient extends PrismaClient {
  private static dbClient: DbClient;

  public static async healthCheck() {
    return this.dbClient.$queryRaw`SELECT 1`.catch((err) => {
      throw new Error(
        "HealtCheck: Please make sure your database server is running"
      );
    });
  }

  public static getInstance() {
    if (!this.dbClient) {
      this.dbClient = new DbClient();
    }
    return this.dbClient;
  }
}
