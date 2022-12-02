import { Request } from "express";
import { IUser } from "./jwt.js";

export interface RequestExt extends Request {
  user?: IUser;
}