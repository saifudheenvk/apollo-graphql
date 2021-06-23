import * as Mongoose from "mongoose";
import { IEventDocument, IEventModel } from "./events.types";

const EventSchema = new Mongoose.Schema<IEventDocument, IEventModel>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: new Date(),
  },
  creator: { type: Mongoose.Schema.Types.ObjectId, ref: "User" },
});

const EventModel: IEventModel = Mongoose.model<IEventDocument, IEventModel>(
  "Event",
  EventSchema
);

export default EventModel;
