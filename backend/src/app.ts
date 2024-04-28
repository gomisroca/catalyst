const express = require('express');
import { Request, Response } from 'express';
const dotenv = require('dotenv');

dotenv.config();
const port = process.env.PORT;

const helmet = require('helmet');
const morgan = require('morgan')
const app = express();

app.use(morgan('combined'));
app.use(helmet());

/**
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
app.get("/", (req: Request, res: Response) => {
    res.send("Hello world!");
});
  
app.listen(port, () => {
    console.log(`[server]: Server is running at port ${port}`)
});