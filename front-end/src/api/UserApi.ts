import BaseApi from "./BaseApi";
import UserReponseResource from "common/User/UserReponseResource";

export default class UserApi extends BaseApi {
  private static instance: UserApi;

  private apiUrl: string = `${this.baseUrl}/users`;

  public static getInstance(): UserApi {
    if (!UserApi.instance) {
      UserApi.instance = new UserApi();
    }

    return UserApi.instance;
  }

  public async getAll() {
    return this.getRequest<UserReponseResource[]>(this.apiUrl);
  }
}
