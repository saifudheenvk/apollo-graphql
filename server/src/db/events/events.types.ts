import { Document, Model } from "mongoose";
import EventType from "src/types/events/event";

export interface IEventDocument extends EventType, Document {
  _id: string;
}

export interface IEventModel extends Model<IEventDocument> {}
