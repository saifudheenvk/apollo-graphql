import { Document, Model } from "mongoose";
import UserType from "src/types/users/user";
import AuthData from "../../types/users/AuthData";

export interface IUserDocument extends UserType, Document {
  _id: string;
}

export interface IUserModel extends Model<IUserDocument> {
  registerUser: (
    this: IUserModel,
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    }
  ) => Promise<IUserDocument>;

  login: (
    this: IUserModel,
    {
      email,
      password,
    }: {
      email: string;
      password: string;
    }
  ) => Promise<AuthData>;

  findByEmail: (
    this: IUserModel,
    email: string
  ) => Promise<IUserDocument | null>;
}
