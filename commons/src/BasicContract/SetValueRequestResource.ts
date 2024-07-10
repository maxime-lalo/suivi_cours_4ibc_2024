import { Expose } from "class-transformer";
import { Max } from "class-validator";
import Resource from "../Resource";

export default class SetValueRequestResource extends Resource {
  @Expose()
  @Max(500)
  public value!: number;
}
