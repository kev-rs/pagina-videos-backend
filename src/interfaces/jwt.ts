import { User } from '@prisma/client';
import { JwtPayload } from 'jsonwebtoken';

export type IUser = Omit<User, 'password' | 'createdAt' | 'updatedAt'>;

export type TokenPayload = IUser & JwtPayload;