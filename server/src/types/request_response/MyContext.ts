import { Request, Response } from "express";

export type MyContext = {
  req: Request & { session: { userId: string; token: string } };
  res: Response;
};
