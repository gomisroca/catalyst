import passport from 'passport';
import DiscordStrategy from 'passport-discord';
import FacebookStrategy from 'passport-facebook';
import GoogleStrategy from 'passport-google-oauth20';
import { db } from './db.js';
import { uploadImageFromUrl } from './upload-image.js';

const {
  DISCORD_ID,
  DISCORD_SECRET,
  DISCORD_CALLBACK_URL,
  FACEBOOK_APP_ID,
  FACEBOOK_APP_SECRET,
  FACEBOOK_CALLBACK_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
} = process.env;

async function handleUserLogin({ provider, profile, accessToken, refreshToken, avatarUrl }) {
  const email = profile.email;
  if (!email) throw new Error(`Failed to receive email from ${provider}. Please try again.`);

  let user = await db.user.findUnique({ where: { email } });

  const newAvatar = await uploadImageFromUrl(avatarUrl, 'avatars');
  const providerIdField = `${provider}Id`;
  const providerData = {
    id: profile.id,
    accessToken,
    refreshToken: refreshToken || null,
  };

  if (user) {
    if (!user[providerIdField]) {
      await db[provider].create({
        data: {
          ...providerData,
          userId: user.id,
        },
      });
      user = await db.user.update({
        where: {
          email,
        },
        data: {
          [providerIdField]: profile.id,
          avatar: newAvatar,
        },
      });
    } else {
      user = await db.user.update({
        where: {
          email,
        },
        data: {
          avatar: newAvatar,
        },
      });
    }

    return user;
  }

  user = await db.user.create({
    data: {
      username: profile.username || profile.displayName,
      email,
      avatar: newAvatar,
      [providerIdField]: profile.id,
      [provider]: {
        create: providerData,
      },
    },
  });

  return user;
}

function setupStrategy(Strategy, options, provider, getProfileDetails) {
  passport.use(
    new Strategy(options, async (accessToken, refreshToken, profile, done) => {
      try {
        const { avatarUrl, ...details } = getProfileDetails(profile);
        const user = await handleUserLogin({
          provider,
          profile: details,
          accessToken,
          refreshToken,
          avatarUrl,
        });
        done(null, user);
      } catch (error) {
        done(error);
      }
    })
  );
}

setupStrategy(
  DiscordStrategy,
  {
    clientID: DISCORD_ID,
    clientSecret: DISCORD_SECRET,
    callbackURL: DISCORD_CALLBACK_URL,
    scope: ['identify', 'email'],
  },
  'discord',
  (profile) => ({
    email: profile.email,
    username: profile.username,
    avatarUrl: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.jpg`,
    id: profile.id,
  })
);

setupStrategy(
  FacebookStrategy,
  {
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'emails', 'photos'],
  },
  'facebook',
  (profile) => ({
    email: profile.emails[0]?.value,
    username: profile.displayName,
    avatarUrl: profile.photos[0]?.value,
    id: profile.id,
  })
);

setupStrategy(
  GoogleStrategy,
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
    scope: ['profile', 'email'],
    state: true,
  },
  'google',
  (profile) => ({
    email: profile._json.email,
    username: profile.displayName,
    avatarUrl: profile._json.picture,
    id: profile.id,
  })
);

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id, done) => {
  try {
    const dbUser = await db.user.findUnique({ where: { id } });
    done(null, dbUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
