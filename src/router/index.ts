import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);

const route = (fileName: string) => fileName.split('.').shift();

fs.readdirSync(__dirname).forEach(async (fileName) => {
  if(!fileName.includes('index')) router.use(`/api/${route(fileName)}`, await import(`./${fileName}`).then(file => file.router));
})

export { router };