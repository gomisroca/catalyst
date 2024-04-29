import { User, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_CALLBACK_URL } = process.env;
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Passport
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done, err) => {
    done(err, user);
});
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,
    scope: [ 'profile', 'email' ],
    state: true,
},
async(accessToken, refreshToken, profile, done) => {
    try{      
        const email = profile['_json']['email'];
        if(!email) return done(new Error('Failed to receive email from Google. Please try again.'));

        const existingUser: User | null = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if(existingUser){
            if(!existingUser.googleId){
                await prisma.google.create({
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
                        googleId: profile.id
                    }
                })
            }
            return done(null, existingUser);
        } 

        const newUser = await prisma.user.create({
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