import { Expose } from "class-transformer";
import Resource from "../Resource";

export default class VerifyWalletRequestResource extends Resource {
    @Expose()
    public walletAddress!: string;

    @Expose()
    public signature!: string;
}
