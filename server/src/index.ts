import { connect } from "./db/database";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./graphql/resolvers/users";
import EventResolver from "./graphql/resolvers/events";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";

const morgan = require("morgan");

const main = async () => {
  const app: express.Application = express();
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();

  app.use(
    cors({
      origin: "http://localhost:3000", // true for all origins
      credentials: true,
    })
  );
  app.use(morgan("dev"));
  app.use(
    session({
      name: "qid",
      store: new RedisStore({ client: redisClient, disableTouch: true }),
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 2, // 2 days
        httpOnly: true,
        secure: false, // works only for https if true
        sameSite: "lax",
      },
      secret: process.env.REDIS_KEY || "secret",
      resave: false,
    })
  );

  const appolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, EventResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res }),
  });

  appolloServer.applyMiddleware({ app, path: "/api", cors: false });

  app.get("/", (_, res) => {
    res.send("It's a node server");
  });

  //connect with mong
  connect();

  //listen at port
  app.listen(process.env.PORT, () => {
    console.log("Started booking app");
  });
};

main().catch((error) => {
  console.error(error);
});
