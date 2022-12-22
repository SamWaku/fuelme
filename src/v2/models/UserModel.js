const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GoogleUserSchema = new Schema({
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
    }
})

const ConfirmedRequest = new Schema({
    historyId: {
        type: String,
        required: false
    }
})

const UserSchema = new Schema({
    userId:{
        type: String,
        required: false
    },
    username: {
        type: String,
        required: false,
        unique: true,
    },
    email:{
        type: String,
        required: false,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please add a valid email",
        ],
        unique: true,
    },
    password:{
        type: String,
        required: false
    },
    geolocation:{
        type: String
    },
    googleuser:[GoogleUserSchema],
    role:{
        type: String,
        default: "user",
        enum: ["client", "driver", "superadmin"]
    },
    orderhistory:[ConfirmedRequest],
    createdAt: {
        createdAt: {
            type: Date,
            default:Date.now
        }
    }
})

const User = mongoose.model('user', UserSchema);
module.exports = User;