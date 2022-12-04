import 'dotenv/config';
import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import { router } from './router/index.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const app: Express = express();
const port = process.env.PORT ?? 8080;

app.use(cors());
app.use(express.json());
app.use(router);
app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hiii I\'m kev & this is my first backend deployed on a vps wii');
})

app.listen(port, () => {
  console.log(`server running on http://localhost:${port}`)
})

export { prisma };