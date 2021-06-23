import { Field, InputType } from "type-graphql";

@InputType()
export default class CreateUserType {
  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  password: string;
}
