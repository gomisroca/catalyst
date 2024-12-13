import express from 'express';
import session from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from '@prisma/client';
import passport from 'passport';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import usersRouter from './routes/users.js';
import projectsRouter from './routes/projects.js';

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

const app = express();

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: false,
  store: new PrismaSessionStore(new PrismaClient(), {
    checkPeriod: 2 * 60 * 1000,
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
};

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  sess.cookie.secure = true;
}

const corsOptions = {
  credentials: true,
  origin: [process.env.FRONTEND_ORIGIN],
};

app.use(express.json({ limit: '5mb' }));
app.use(session(sess));
app.use('/images', express.static('public'));
app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('<h4>Welcome to the Catalyst API</h4><p>This page serves as a health check.</p>');
});

app.use('/users', usersRouter);
app.use('/projects', projectsRouter);

app.listen(process.env.PORT, () => {
  console.log(`[SERVER] Running at port ${process.env.PORT}`);
  console.log(`[SERVER] Environment ${process.env.NODE_ENV}`);
});
