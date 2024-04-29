import { User, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET, FACEBOOK_CALLBACK_URL } = process.env;

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done, err) => {
    done(err, user);
});
passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: FACEBOOK_CALLBACK_URL,
    profileFields: ['id', 'displayName', 'emails', 'photos']
},
async function(accessToken, refreshToken, profile, done) {
    try{
        const email = profile.emails[0].value;
        if(!email) return done(new Error('Failed to receive email from Facebook. Please try again.'));
        const existingUser: User | null = await prisma.user.findUnique({
            where: {
                email: email
            }
        }) 
        
        if(existingUser){
            if(!existingUser.facebookId){
                await prisma.facebook.create({
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
                        facebookId: profile.id
                    }
                })
            }
            return done(null, existingUser);
        } 

        const newUser = await prisma.user.create({
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