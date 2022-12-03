import { Request, Response } from "express";
import { prisma } from "../app.js";
import { loginSchema, LoginSchema, signInSchema, SignUpSchema } from "../common/auth.js";
import { RequestExt } from "../interfaces/req.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ResType } from "../interfaces/res.js";
import { IUser } from "../interfaces/jwt.js";
import { Prisma } from "@prisma/client";
// import cookie from 'cookie-parser';

const authSelect = Prisma.validator<Prisma.UserSelect>()({
  email: true, name: true, id: true
})

const getUsers = async ( req: RequestExt, res: Response ) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
}

const signUp = async (req: Request<any, any, SignUpSchema>, res: Response<ResType<IUser>>) => {
  const { confirm_password, ...userInfo } = req.body;

  const creds = signInSchema.safeParse({ confirm_password, ...userInfo });
  if(!creds.success) return res.status(400).send({ error: creds.error.issues[0].message });

  const check_user_db = await prisma.user.findUnique({ where: { email: creds.data.email } });
  if(check_user_db) return res.status(409).send({ error: 'Email already in use' })

  const user = await prisma.user.create({ 
    data: { 
      email: userInfo.email, 
      name: userInfo.name,
      password: bcrypt.hashSync(userInfo.password, 10)
    }, 
    select: authSelect 
  });

  res.status(201).send({ data: user, message: 'User created successful' })
}

const signIn = async ( req: Request<any, any, LoginSchema>, res: Response<ResType<{ user: IUser, token: string }>> ) => {
  const user_credentials = req.body;

  const authorize = loginSchema.safeParse(user_credentials);
  if(!authorize.success) return res.status(401).json({ error: authorize.error.issues[0].message });

  const user = await prisma.user.findUnique({ where: { email: user_credentials.email } });
  if(!user) return res.status(401).json({ error: 'User not found' });

  if(!bcrypt.compareSync(user_credentials.password, user.password)) return res.status(401).json({ error: 'Your password is wrong' })

  const token = jwt.sign({
    id: user.id,
    email: user.email,
    name: user.name,
  }, `${process.env.JWT_SECRET}`, { expiresIn: '1h', mutatePayload: false });

  res
    .status(200)
    .cookie('auth', token, {
      secure: true,
      httpOnly: true,
      sameSite: 'none'
    })
    .send({
      data: {
        user: { email: user.email, id: user.id, name: user.name },
        token,
      },
      message: 'Login successful',
    });
}

const signOut = async (req: Request, res: Response) => {
  res.sendStatus(200);
}

export { getUsers, signIn, signUp, signOut };