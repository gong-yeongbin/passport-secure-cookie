import express from 'express';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import { Strategy } from './index';

const app = express();

app.use(cookieParser());

passport.use(
  new Strategy({ cookienameField: 'access_token', passReqToCallback: true }, (request, token, done) => {
    if (!token) {
      return done(null, false, 'error');
    }
    return done(null);
  }),
);

app.get('/', passport.authenticate('secure-cookie', { session: false }), (req, res) => {
  console.log(req);
  res.send('hello world');
});

app.listen(3000);
