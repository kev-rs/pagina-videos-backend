import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename);

const route = (fileName: string) => fileName.split('.').shift();

fs.readdirSync(dirname).forEach(async (fileName) => {
  if(!fileName.includes('index')) router.use(`/api/${route(fileName)}`, await import(`./${route(fileName)}.js`).then(file => file.router));
})

export { router };