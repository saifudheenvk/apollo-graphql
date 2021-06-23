import "reflect-metadata";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import EventType from "../../types/events/event";
import EventModel from "../../db/events/events.model";
import CreateEventType from "../../types/events/createEvent";
import { MyContext } from "src/types/request_response/MyContext";

@Resolver()
export default class EventResolver {
  @Query(() => [EventType])
  async events() {
    try {
      const events = await EventModel.find().populate({
        path: "creator",
        populate: { path: "createdEvents" },
      }); //populate createdevents iside creator
      return events;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => EventType)
  async createEvent(
    @Arg("eventInput") eventInput: CreateEventType,
    @Ctx() ctx: MyContext
  ) {
    try {
      const event = await EventModel.create({
        ...eventInput,
        date: new Date(eventInput.date),
        creator: ctx.req.session,
      });
      return event;
    } catch (error) {
      throw error;
    }
  }
}
