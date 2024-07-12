import { Expose } from "class-transformer";
import Resource from "../Resource";
import { IsEmail, MinLength } from "class-validator";

export default class UserLoginRequestResource extends Resource {
    @IsEmail()
    @Expose()
    public email!: string;

    @MinLength(6)
    @Expose()
    public password!: string;
}
