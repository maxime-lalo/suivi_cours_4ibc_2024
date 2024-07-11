import { Expose } from "class-transformer";
import Resource from "../Resource";
import { IsEmail, MinLength } from "class-validator";

export default class UserCreateRequestResource extends Resource {
  @IsEmail()
  @Expose()
  public email!: string;

  @MinLength(6)
  @Expose()
  public password!: string;

  @MinLength(6)
  @Expose()
  public name!: string;
}
