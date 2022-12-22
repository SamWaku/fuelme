//import modiles
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config();
const { JWT_SECRET } = process.env;
const { REFRESH_TOKEN_SECRET } = process.env;


//UserSchema
const userSchema = new Schema({
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
    googleuser:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "googleuser",
        required: false
    },
    role:{
        type: String,
        default: "customer",
        enum: ["customer", "driver", "superadmin"]
    },
    orderhistory:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "ConfirmedFuelRequest",
    },
    createdAt: {
        createdAt: {
            type: Date,
            default:Date.now
        }
    }
})


//middleware funtion generating the token expiry time
userSchema.methods.generateAuthToken = function () {
    const User = this;
    const secrect = JWT_SECRET;
    const token = jwt.sign({_id: User._id}, secrect, {
        expiresIn: '2m',
    });  
    User.token = token;
}

//middleware function to refresh a token 5m
userSchema.methods.generaRefreshToken = function () {
    const User = this;
    const secrect = REFRESH_TOKEN_SECRET;
    const refreshToken = jwt.sign({_id: User._id }, secrect, {
        expiresIn: '5m',
    },);
    User.refreshToken = refreshToken;
}

userSchema.pre('save', async function (next) {
    const User = this;
    if (User.isModified('password')) {
        User.password = await bcrypt.hash(User.password, 12);
    }
    next();
});

const User = mongoose.model('user', userSchema);
module.exports = User;