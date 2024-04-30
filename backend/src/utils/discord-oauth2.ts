import { User, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const passport = require('passport');
const DiscordStrategy = require('passport-discord').Strategy;
const { DISCORD_ID, DISCORD_SECRET, DISCORD_CALLBACK_URL } = process.env;
import { downloadImage } from './upload-image';

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});
passport.use(new DiscordStrategy({
    clientID: DISCORD_ID,
    clientSecret: DISCORD_SECRET,
    callbackURL: DISCORD_CALLBACK_URL,
    scope: ['identify', 'email']
},
async function(accessToken, refreshToken, profile, done) {
    try{
        const avatar = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.jpg`
        const email = profile.email;
        if(!email) return done(new Error('Failed to receive email from Discord. Please try again.'));
        let existingUser: User | null = await prisma.user.findUnique({
            where: {
                email: email
            }
        }) 
        
        if(existingUser){
            const newAvatar = await downloadImage('avatars', avatar, existingUser.id);
            if(!existingUser.discordId){
                await prisma.discord.create({
                    data: {
                        id: profile.id,
                        userId: existingUser.id,
                        accessToken: accessToken,
                        refreshToken: refreshToken ? refreshToken : null,
                    }
                })
                existingUser = await prisma.user.update({
                    where: {
                        email: email
                    },
                    data: {
                        discordId: profile.id,
                        avatar: newAvatar,
                    }
                })
            } else{
                existingUser = await prisma.user.update({
                    where: {
                        email: email
                    },
                    data: {
                        avatar: newAvatar,
                    }
                })
            }
            
            return done(null, existingUser);
        } 

        let newUser = await prisma.user.create({
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
        const newAvatar = await downloadImage('avatars', avatar, newUser.id);
        newUser = await prisma.user.update({
            where: {
                id: newUser.id
            },
            data: {
                avatar: newAvatar
            }
        })

        return done(null, newUser);
    }catch (verifyErr) {
        done(verifyErr);
    }
}
));

module.exports = passport;