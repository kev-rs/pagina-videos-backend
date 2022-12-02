import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

const session = async (req: Request, res: Response<{ message: string; }>, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if(!token) return res.status(401).json({ message: 'UNAUTHORIZED - No token' });
    const jwtPayload = jwt.verify(token, String(process.env.JWT_SECRET));
    console.log({ token, jwt });
    next();
  } catch (err) {
    return res.status(401).json({ message: `${(err as jwt.VerifyErrors).message ?? 'Invalid Token'}` });
  }
}

export { session };