import { Router } from "express";
import { getUsers } from "../controllers/auth.js";
import { session } from "../middleware/session.js";


const router = Router();

router
  .get('/', session, getUsers)

export { router };