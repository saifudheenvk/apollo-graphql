import AuthData from "../../types/users/AuthData";
import { IUserDocument, IUserModel } from "./users.types";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

export async function findByEmail(
  this: IUserModel,
  email: string
): Promise<IUserDocument | null> {
  return this.findOne({ email });
}

async function registerUser(
  this: IUserModel,
  { email, password }: { email: string; password: string }
): Promise<IUserDocument> {
  const record: IUserDocument | null = await this.findByEmail(email);
  if (record) {
    throw new Error("This email already exists");
  } else {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await this.create({
      email,
      password: hash,
    });
    console.log(password, hash, this, newUser);
    return newUser;
  }
}

async function login(
  this: IUserModel,
  { email, password }: { email: string; password: string }
): Promise<AuthData> {
  const user: IUserDocument | null = await this.findByEmail(email);
  if (!user) throw new Error("Incorrect email.");
  const validPass = await bcrypt.compare(password, user.password);
  if (validPass) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "48h",
    });
    return { user, token, tokenExpiration: 48 };
  } else throw new Error("Incorrect password.");
}

module.exports = { findByEmail, registerUser, login };
