import express from 'express';
import cors from 'cors';
import passport from 'passport';
import jwtStrategy from './config/auth';
import handleError from './middlewares/errors';
import { v1 as v1routes } from './routes';

const app = express();

app.use(express.json);

app.use(cors());
app.options('*', cors());

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use(handleError);

app.use('/v1', v1routes);

export default app;
