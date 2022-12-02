import { Request, Response } from "express";
import { prisma } from "../app.js";

const getUsers = async ( req: Request, res: Response ) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
}

export { getUsers };