import { Expose, Type } from "class-transformer";
import Resource from "../Resource";
import PostsResponseResource from "../Posts/PostsResponseResource";

export default class UserResponseResource extends Resource {
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

    @Expose()
    @Type(() => PostsResponseResource)
    public Post?: PostsResponseResource[] = [];
}
