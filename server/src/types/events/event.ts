import { Field, ID, ObjectType } from "type-graphql";
import UserType from "../users/user";

@ObjectType()
export default class EventType {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  description: string;

  @Field({ nullable: false })
  price: string;

  @Field({ nullable: false })
  date: Date;

  @Field(() => UserType)
  creator: UserType;
}
