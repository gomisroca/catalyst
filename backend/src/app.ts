const express = require('express');
import { Request, Response } from 'express';

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
  
app.listen(8000);