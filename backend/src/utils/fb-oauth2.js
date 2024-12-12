import { PrismaClient } from '@prisma/client';
import { downloadImage } from './upload-image.js';
const prisma = new PrismaClient();

import passport from 'passport';
import * as PassportFacebook from 'passport-facebook';
const FacebookStrategy = PassportFacebook.Strategy;

const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, FACEBOOK_CALLBACK_URL } = process.env;

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: FACEBOOK_CALLBACK_URL,
      profileFields: ['id', 'displayName', 'emails', 'photos'],
    },
    async function (accessToken, refreshToken, profile, done) {
      try {
        const email = profile.emails[0].value;
        if (!email) return done(new Error('Failed to receive email from Facebook. Please try again.'));
        let existingUser = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (existingUser) {
          const newAvatar = await downloadImage('avatars', profile.photos[0].value, existingUser.id);
          if (!existingUser.facebookId) {
            await prisma.facebook.create({
              data: {
                id: profile.id,
                userId: existingUser.id,
                accessToken: accessToken,
                refreshToken: refreshToken ? refreshToken : null,
              },
            });
            existingUser = await prisma.user.update({
              where: {
                email: email,
              },
              data: {
                facebookId: profile.id,
                avatar: newAvatar,
              },
            });
          }
          existingUser = await prisma.user.update({
            where: {
              email: email,
            },
            data: {
              avatar: newAvatar,
            },
          });
          return done(null, existingUser);
        }

        let newUser = await prisma.user.create({
          data: {
            username: profile.displayName,
            email: email,
            avatar: profile.photos[0].value,
            facebookId: profile.id,
            facebook: {
              create: {
                id: profile.id,
                accessToken: accessToken,
                refreshToken: refreshToken ? refreshToken : null,
              },
            },
          },
        });
        const newAvatar = await downloadImage('avatars', profile.photos[0].value, newUser.id);
        newUser = await prisma.user.update({
          where: {
            id: newUser.id,
          },
          data: {
            avatar: newAvatar,
          },
        });

        return done(null, newUser);
      } catch (verifyErr) {
        done(verifyErr);
      }
    }
  )
);

export default passport;
