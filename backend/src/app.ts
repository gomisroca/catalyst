import express, { NextFunction, Request, Response } from 'express';
import session, { SessionOptions } from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import passport from 'passport';
import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import routes from '@/handlers/index';
import { db } from '@/utils/db';
import { sendError, sendSuccess } from '@/utils/standard-responses';
import { rateLimiter } from './middlewares/rate-limiter';

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

const app = express();

const sess: SessionOptions = {
  secret: process.env.SESSION_SECRET as string,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
  resave: false,
  saveUninitialized: false,
  store: new PrismaSessionStore(db, {
    checkPeriod: 2 * 60 * 1000,
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
};

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
  (sess.cookie as session.CookieOptions).secure = true;
}

const corsOptions: CorsOptions = {
  credentials: true,
  origin: [process.env.FRONTEND_ORIGIN as string],
};

app.use(express.json({ limit: '5mb' }));
app.use(session(sess));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(morgan('combined'));
app.use(helmet());
app.use(rateLimiter);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (_, res: Response) =>
  sendSuccess(res, 'Welcome to the Catalyst API. This page serves as a health check.')
);
app.use('/', routes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  sendError(res, `Something broke: ${err.message}`);
});

app.listen(process.env.PORT, () => {
  console.log(`[SERVER] Running at port ${process.env.PORT}`);
  console.log(`[SERVER] Environment ${process.env.NODE_ENV}`);
});

export default app;
