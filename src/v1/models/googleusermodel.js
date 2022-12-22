//import modiles
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dotenv = require('dotenv')

dotenv.config();

//googleuser schema
const userSchema = new Schema({
    googleId: {
        type: String,
        required: true
    },
    displayName:{
        type: String,
        required: false
    },
    name:{
        type: String,
        required: false
    },
    familyName: {
        type: String,
        required: false
    }, 
    givenName: {
        type: String,
        required: false
    },
    image: {
        type: String,
    },
    createdAt: {
        type: Date,
        default:Date.now
    }
});

const GoogleUser = mongoose.model('googleuser', userSchema);
module.exports = GoogleUser;