import { Field, ID, ObjectType } from "type-graphql";
import EventType from "../events/event";

@ObjectType()
export default class UserType {
  @Field(() => ID)
  _id: string;

  @Field({ nullable: false })
  email: string;

  @Field(() => [EventType])
  createdEvents: EventType[];

  password: string;
}
