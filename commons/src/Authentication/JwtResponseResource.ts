import { Expose } from "class-transformer";
import Resource from "../Resource";

export default class JwtResponseResource extends Resource {
    @Expose()
    public id!: number;

    @Expose()
    public email!: string;

    @Expose()
    public name!: string;

    @Expose()
    public walletAddress!: string | null;

    @Expose()
    public messageToSign!: string | null;
}
