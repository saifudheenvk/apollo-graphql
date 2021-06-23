import { Field, ObjectType } from "type-graphql";
import UserType from "./user";

@ObjectType()
export default class AuthData {
  @Field(() => UserType, { nullable: false })
  user: UserType;

  token: string;
  @Field(() => String, { nullable: false })
  tokenExpiration: number;
}
