//modules needed
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const confirmedfuelrequest = require("../../models/confirmedfuelrequest");
const FuelRequest = require("../../models/FuelRequest");
const User = require('../../models/usermodel')

//env variables
dotenv.config()

//creating new user
exports.newUser = async (req, res) => {
    try {
        const { username, email, phone ,password, roles} = req.body;
        const user = await User.findOne({ email });

        if(user){
            return res.status(400).send({
                message: 'user already exists!'
            })
        }

        const newUser = new User({
            username,
            email,
            phone,
            password,
            roles
        });

        //saving instance to db
        await newUser.save();
        //console.log(newUser)
        res.status(201).send({
            message:'user successfully Created!'
        });
        
    } catch (error) {
        res.status(500).send({
            status: 500,
            error: error.message,
        });
    }
}

//login user
exports.loginUser = async (req, res, next) => {
    try{
        //checking user email
        const {email, password} = req.body;
        const user = await User.findOne({ email }).exec();
        if(!user) return res.status(401).json({message: 'user not found'});

        //checking user password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)return res.status(401).json({message: 'Incorrect password please try again'});
        await user.generateAuthToken();

        res.status(200).send({
            //data:user,
            message: "login successful",
        });
    }catch(err){
        res.status(500).send({ error: err})
        return res.send(err.message);
    }
    next();
}

exports.getuser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user) {
            return res.send("user not found")
        } 
        return res.status(200).send(user);
    } catch (error) {
        
    }
}

exports.getusers = async (req, res) => {
    try {
        const user = await User.find()
        if(!user) {
            return res.send("users not found")
        } 
        return res.status(200).send(user);
    } catch (error) {
        
    }
}

exports.history = async (req,res) => {
    try {
        const requests = FuelRequest.findById(req.params.id)
        if(requests.length<1){
            return res.send("no requests made")
        }
        return res.status(200).send(requests)
    } catch (err) {
        res.status(500).send({ error: err})
        return res.send(err.message);
    }
}