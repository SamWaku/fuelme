//modules
const passport = require('passport');
const mongoose = require('mongoose')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GoogleUser = require('../models/googleusermodel')
const User = require('../models/googleusermodel')
const dotenv = require('dotenv')

dotenv.config();

const { clientID } = process.env;
const { clientSecret } = process.env;

module.exports = function(passport) {
    
    passport.use(new GoogleStrategy({
        clientID: clientID,
        clientSecret: clientSecret,
        callbackURL:"https://fuelme.samwaku.com/api/user/auth/google/callback"
    }, 
    async (accessToken, refreshToken, profile, done) => {
        const newUser = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.givenName,
            lastName: profile.familyName,
            image: profile.photos[0].value,
        }
        try {
            let user = await User.findOne({ googleId: profile.id})

            if (user) {
                done(null, user)
            } else {
                user = await User.create(newUser)
                done(null, user)
            }
        } catch (err) {
           console.error(err)
        }
    }
    ))

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done)=>{
        User.findById(id, (err, user) => done(err, user))
    })
}

