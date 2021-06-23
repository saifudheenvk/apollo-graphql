import { Field, InputType } from "type-graphql";

@InputType()
export default class CreateEventType {
  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  description: string;

  @Field({ nullable: false })
  price: string;

  @Field({ nullable: false })
  date: Date;
}
