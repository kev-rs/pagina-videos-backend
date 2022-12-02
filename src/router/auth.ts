import { Response, Router } from "express";
import { getUsers, signIn, signUp } from "../controllers/auth.js";
import { session } from "../middleware/session.js";


const router = Router();

router
  .get('/hello', (_, res: Response) => res.send('Hola :)'))
  .get('/', session, getUsers)
  .post('/login', signIn)
  .post('/register', signUp)

export { router };