import * as Mongoose from "mongoose";
import { IUserDocument, IUserModel } from "./users.types";
const statics = require("./users.statics");

const UserSchema = new Mongoose.Schema<IUserDocument, IUserModel>({
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true,
  },
  createdEvents: [{ type: Mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

UserSchema.statics = statics;
const UserModel: IUserModel = Mongoose.model<IUserDocument, IUserModel>(
  "User",
  UserSchema
);

export default UserModel;
