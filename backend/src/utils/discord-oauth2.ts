import { User, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const { DISCORD_ID, DISCORD_SECRET, DISCORD_CALLBACK_URL } = process.env;

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done, err) => {
    done(err, user);
});
passport.use(new DiscordStrategy({
    clientID: DISCORD_ID,
    clientSecret: DISCORD_SECRET,
    callbackURL: DISCORD_CALLBACK_URL,
    scope: ['identify', 'email']
},
async function(accessToken, refreshToken, profile, done) {
    try{
        console.log(profile)
        const avatar = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.jpg`
        const email = profile.email;
        if(!email) return done(new Error('Failed to receive email from Discord. Please try again.'));
        const existingUser: User | null = await prisma.user.findUnique({
            where: {
                email: email
            }
        }) 
        
        if(existingUser){
            if(!existingUser.discordId){
                await prisma.discord.create({
                    data: {
                        id: profile.id,
                        userId: existingUser.id,
                        accessToken: accessToken,
                        refreshToken: refreshToken ? refreshToken : null,
                    }
                })
                await prisma.user.update({
                    where: {
                        email: email
                    },
                    data: {
                        discordId: profile.id
                    }
                })
            }
            return done(null, existingUser);
        } 

        const newUser = await prisma.user.create({
            data: {
                username: profile.username,
                email: email,
                avatar: avatar,
                discordId: profile.id,
                discord: {
                    create: {
                        id: profile.id,
                        accessToken: accessToken,
                        refreshToken: refreshToken ? refreshToken : null,
                    }
                }
            }
        })

        return done(null, newUser);
    }catch (verifyErr) {
        done(verifyErr);
    }
}
));

module.exports = passport;