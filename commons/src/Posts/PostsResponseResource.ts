import { Expose } from "class-transformer";
import Resource from "../Resource";

export default class PostsResponseResource extends Resource {
  @Expose()
  public id!: number;

  @Expose()
  public title!: string;
}
