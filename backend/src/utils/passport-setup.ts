import passport from 'passport';
import DiscordStrategy, { Profile as DiscordProfile } from 'passport-discord';
import { Strategy as FacebookStrategy, Profile as FacebookProfile } from 'passport-facebook';
import { Strategy as GoogleStrategy, Profile as GoogleProfile } from 'passport-google-oauth20';
import { db } from '@/utils/db';
import { uploadImageFromUrl } from '@/utils/upload-image';
import { randomUUID } from 'crypto';
import { User } from '@prisma/client';

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

interface UserLoginDetails {
  provider: 'discord' | 'facebook' | 'google';
  profile: {
    email: string;
    username?: string;
    nickname?: string;
    id: string;
  };
  accessToken: string;
  refreshToken?: string;
  avatarUrl: string;
}

async function handleUserLogin({
  provider,
  profile,
  accessToken,
  refreshToken,
  avatarUrl,
}: UserLoginDetails): Promise<User> {
  const email = profile.email;
  if (!email) throw new Error(`Failed to receive email from ${provider}. Please try again.`);

  let user = await db.user.findUnique({ where: { email } });

  const newAvatar = await uploadImageFromUrl(avatarUrl, 'avatars');
  const providerIdField = `${provider}Id` as keyof User;
  const providerData = {
    id: profile.id,
    accessToken,
    refreshToken: refreshToken || null,
  };

  if (user) {
    if (!user[providerIdField]) {
      if (provider === 'discord') {
        await db.discord.create({
          data: {
            ...providerData,
            userId: user.id,
          },
        });
      } else if (provider === 'facebook') {
        await db.facebook.create({
          data: {
            ...providerData,
            userId: user.id,
          },
        });
      } else if (provider === 'google') {
        await db.google.create({
          data: {
            ...providerData,
            userId: user.id,
          },
        });
      } else {
        throw new Error(`Unknown provider: ${provider}`);
      }
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
      username: profile.username || randomUUID(),
      nickname: profile.nickname ?? profile.username,
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

type StrategyConstructor = new (...args: any[]) => any;
type StrategyOptions = Record<string, any>;
type ProfileParser = (profile: any) => {
  email: string;
  username?: string;
  nickname?: string;
  avatarUrl: string;
  id: string;
};

function setupStrategy(
  Strategy: StrategyConstructor,
  options: StrategyOptions,
  provider: 'discord' | 'facebook' | 'google',
  getProfileDetails: ProfileParser
) {
  passport.use(
    new Strategy(
      options,
      async (accessToken: string, refreshToken: string, profile: any, done: (error: any, user?: any) => void) => {
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
      }
    )
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
  (profile: DiscordProfile) => ({
    email: profile.email!,
    username: profile.username,
    nickname: profile.username,
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
  (profile: FacebookProfile) => ({
    email: profile.emails![0]?.value,
    username: profile.displayName,
    nickname: profile.displayName,
    avatarUrl: profile.photos![0]?.value,
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
  (profile: GoogleProfile) => ({
    email: profile._json.email!,
    username: profile.displayName,
    nickname: profile.displayName,
    avatarUrl: profile._json.picture!,
    id: profile.id,
  })
);

// @ts-ignore
passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser(async (id: string, done) => {
  try {
    const dbUser = await db.user.findUnique({ where: { id } });
    done(null, dbUser);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
