import fs from 'fs';
import cors from 'cors';
import https from 'https';
import express from 'express';

import router from './routes.js'
import { createTable } from './Controler/Hero.js';

createTable()

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.listen( 3000, ()=>console.log("Api running..."))

https.createServer({
    cert: fs.readFileSync('src/SSL/code.crt'),
    key: fs.readFileSync('src/SSL/code.key')
}, app).listen(3001, ()=> console.log("API Running on https..."));