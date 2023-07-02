//needed modules
const express = require("express");
const exphbs = require('express-handlebars');
const ejs = require("ejs");
const passport = require('passport');
const session = require ('express-session')
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const findOrCreate = require("mongoose-findorcreate");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')


//entry point
const app = express();

//routes
const auth = require('./src/v1/routes/user');
const fuel = require('./src/v1/routes/fuel');
const pages = require('./src/v1/routes/client-routes');

//passport config
require('./src/v1/config/passport')(passport)

//setting up ejs view template and express Handlebars
app.engine('.hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs'}))
app.set("view engine", ".hbs");

//express-session middleware
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "SECRET",
}));

//passport middleware
app.use(passport.initialize());
app.use(passport.session());


//static folder
app.use(express.static(path.join(__dirname, '/public' )))

//swagger configurations
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Fuelme API",
            version: "1.0.0",
            description: "Fuelme  API"
        },
        servers: [
            {
                url: 'https:/fuelmeapi.herokuapp.com/'
            }
        ],
    },
    apis:["./src/routes/*.js"]
}

//swagger js configurations
const specs = swaggerJsDoc(options)

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

app.use(logger("dev"));
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(cors({
        allowedHeaders: ['sessionId','Access-Control-Allow-Origin', 'Content-Type', 'master-token'],
        exposedHeaders: ['sessionId'],
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
    }),
)

const PORT = process.env.PORT
const MongoLocalURI = process.env.MongoLocalURI

//entrance
app.get('/', (req,res) => {
    res.render('home', {
            layout: 'home'
         })
})

//database config
const db = require('./src/v1/config/key');
const swaggerJSDoc = require("swagger-jsdoc");

mongoose.set('strictQuery',false);
mongoose
        .connect(MongoLocalURI, { useUnifiedTopology:true, useNewUrlParser:true,})
        .then(() => console.log("connected to db"))
        .catch(err => console.log(err))

//routes
app.use('/api/user', auth);
app.use('/api/fuel', fuel)
app.use('/', pages)


app.listen(PORT, () => {
    console.log(`connected on port ${PORT}`)
})




//callback issues