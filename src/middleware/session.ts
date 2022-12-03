import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken';
import { TokenPayload, RequestExt } from "../interfaces/index.js";

const session = async (req: RequestExt, res: Response<{ message: string; }>, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ').pop();
    if(!token) return res.status(401).json({ message: 'UNAUTHORIZED - No token' });
    const jwtPayload = jwt.verify(token, String(process.env.JWT_SECRET));
    req.user = jwtPayload as TokenPayload
    next();
  } catch (err) {
    return res.status(401).json({ message: `${(err as jwt.VerifyErrors).message ?? 'Invalid Token'}` });
  }
}

export { session };
