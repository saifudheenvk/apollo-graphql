import "reflect-metadata";
import UserModel from "../../db/users/users.model";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import UserType from "../../types/users/user";
import CreateUserType from "../../types/users/createUser";
import { IUserDocument } from "src/db/users/users.types";
import AuthData from "../../types/users/AuthData";
import { MyContext } from "src/types/request_response/MyContext";
const jwt = require("jsonwebtoken");

@Resolver()
export class UserResolver {
  @Query(() => UserType, { nullable: true })
  async getMyDetails(@Ctx() { req }: MyContext) {
    if (!req.session.token) {
      return null;
    } else {
      const token = req.session.token;
      const verified = jwt.verify(token, process.env.JWT_TOKEN);
      console.log(verified);
      const user = await UserModel.findById(verified.userId);
      return user;
    }
  }

  @Query(() => [UserType])
  async users() {
    try {
      const users = await UserModel.find().populate("createdEvents");
      return users;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => UserType)
  async createUser(@Arg("userInput") userInput: CreateUserType) {
    console.log(userInput);
    try {
      const user: IUserDocument = await UserModel.registerUser(userInput);
      return user;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(() => AuthData)
  async login(
    @Arg("loginInput") loginInput: CreateUserType,
    @Ctx() ctx: MyContext
  ) {
    try {
      const data: AuthData = await UserModel.login(loginInput);

      //with this step an object {token:"token value"} will be stored in the redis.
      // redis is a key value store which   so it will be stored like this (key value will map to the object) sess:"sdjcsdc" -> {token:"token val"}
      // session middle ware will set a cookie on our browser like a junk "sdsdvsdgcvhdh@fchfgc" (this is actally a signed version of redis key value)
      // when a user makes a request browser will send a value to the server
      // on the server it unsign the key with secret provided in env file(so we will be getting the key value of redis).
      // then it will make a request to the redis so that we will get the value
      // then the value will be stored in request.session
      ctx.req.session.token = data.token;
      return data;
    } catch (error) {
      throw error;
    }
  }
}
