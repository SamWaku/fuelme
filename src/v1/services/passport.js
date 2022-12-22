//modules
const passport = require('passport');
const mongoose = require('mongoose')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/usermodel')

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((id, cb) => {
    User.findById(id).then(user =>{
        cb(null, user)
    })
})

passport.use(new GoogleStrategy({
    clientID:"2937401907-6vjbqu7kdgebndevt1upge3ghh2oq6bp.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:3000/auth/google/secret"
}, (token, tokenSecret, profile, done) => {
    User.findOrCreate({ username:profile.username}).then(existingUser => {
        if(existingUser){
            done(null, existingUser);
    } else {
            new User({username:profile.username}).save().then(user => done(null, user))
    }   
    })
}
))