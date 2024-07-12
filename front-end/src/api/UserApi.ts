import BaseApi from "./BaseApi";
import UserReponseResource from "common/User/UserReponseResource";
import UserCreateRequestResource from "common/User/UserCreateRequestResource";
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

    public async createUser(body: UserCreateRequestResource) {
        return this.postRequest<UserReponseResource>(this.apiUrl, {
            ...body,
        });
    }

    public async getById(id: number) {
        return this.getRequest<UserReponseResource>(
            `${this.apiUrl}/${id}`
        ).catch((e) => console.error(e));
    }
}
