import type { Cookie } from 'express-session';
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const app = express();

const sess = {
  secret: <string>process.env.SESSION_SECRET,
  cookie: <Cookie>{},
  resave: false,
  saveUninitialized: false,
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

const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter);
const projectsRouter = require('./routes/projects');
app.use('/api/projects', projectsRouter);

app.listen(process.env.PORT, () => {
  console.log(`[SERVER] Running at port ${process.env.PORT}`);
  console.log(`[SERVER] Environment ${process.env.NODE_ENV}`);
});
