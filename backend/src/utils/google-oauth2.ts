import { User, PrismaClient } from '@prisma/client';
import { downloadImage } from './upload-image';
const prisma = new PrismaClient();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = process.env;
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Passport
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CALLBACK_URL,
      scope: ['profile', 'email'],
      state: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile['_json']['email'];
        if (!email) return done(new Error('Failed to receive email from Google. Please try again.'));

        let existingUser: User | null = await prisma.user.findUnique({
          where: {
            email: email,
          },
        });

        if (existingUser) {
          const newAvatar = await downloadImage('avatars', profile._json.picture, existingUser.id);
          if (!existingUser.googleId) {
            await prisma.google.create({
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
                googleId: profile.id,
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
            avatar: profile._json.picture,
            googleId: profile.id,
            google: {
              create: {
                id: profile.id,
                accessToken: accessToken,
                refreshToken: refreshToken ? refreshToken : null,
              },
            },
          },
        });
        const newAvatar = await downloadImage('avatars', profile._json.picture, newUser.id);
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

module.exports = passport;
