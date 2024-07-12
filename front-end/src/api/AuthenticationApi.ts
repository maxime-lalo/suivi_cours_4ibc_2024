import UserCreateRequestResource from "common/User/UserCreateRequestResource";
import UserLoginRequestResource from "common/User/UserLoginRequestResource";
import VerifyWalletRequestResource from "common/Authentication/VerifyWalletRequestResource";
import BaseApi from "./BaseApi";
export default class AuthenticationApi extends BaseApi {
    private static instance: AuthenticationApi;

    private apiUrl: string = `${this.baseUrl}/auth`;

    public static getInstance(): AuthenticationApi {
        if (!AuthenticationApi.instance) {
            AuthenticationApi.instance = new AuthenticationApi();
        }

        return AuthenticationApi.instance;
    }

    public async register(body: UserCreateRequestResource) {
        return this.postRequest<{ accessToken: string }>(
            `${this.apiUrl}/register`,
            {
                ...body,
            }
        );
    }

    public async login(body: UserLoginRequestResource) {
        return this.postRequest<{ accessToken: string }>(
            `${this.apiUrl}/login`,
            {
                ...body,
            }
        );
    }

    public async verifyWallet(body: VerifyWalletRequestResource) {
        return this.postRequest<{ accessToken: string }>(
            `${this.apiUrl}/verify-wallet`,
            {
                ...body,
            }
        );
    }
}
