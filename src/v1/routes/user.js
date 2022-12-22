const router = require('express').Router();
const passport = require ('passport')
const usercontroller = require('../controllers/auth/usercontroller');

/**
 * @swagger
 * components:
 *   schemas:
 *    User:
 *       type: object
 *       required:
 *         - ownername
 *         - platenumber
 *         - color
 *         - vehicle
 *         - weight
 *         - email
 *         - phone
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the User
 *         ownername: 
 *           type: string
 *           description: The vehicle ownername
 *         platenumber: 
 *           type: string
 *           description: The vehicle platenumber(s)
 *         color: 
 *           type: string
 *           description: The vehicle color
 *         vehicle: 
 *           type: string
 *           description: The vehicle model and name
 *         weight: 
 *           type: string
 *           description: The vehicle weight cataegory
 *         email:
 *           type: string
 *           description: The user email
 *         phone:
 *           type: number
 *           description: The user phone number
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         id: 62e8decd00bb07167878eea0 
 *         ownername: Blega
 *         platenumber: BAZ123
 *         color: Black
 *         vehicle: Audi Q4
 *         weight: 2000KGs SUV
 *         email: blega@gmail.com
 *         phone: 960000001
 *         password: eToll@2022
 *         date: 2022-08-02T08:22:37.063Z
 */


/**
 * @swagger
 * components:
 *   schemas:
 *     UserSignup:
 *       type: object
 *       required:
 *         - ownername
 *         - platenumber
 *         - vehicle
 *         - weight
 *         - email
 *         - phone
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the User
 *         ownername: 
 *           type: string
 *           description: The vehicle ownername
 *         platenumber: 
 *           type: string
 *           description: The vehicle platenumber(s)
 *         color: 
 *           type: string
 *           description: The vehicle color
 *         vehicle: 
 *           type: string
 *           description: The vehicle model and name
 *         weight: 
 *           type: string
 *           description: The vehicle weight cataegory
 *         email:
 *           type: string
 *           description: The user email
 *         phone:
 *           type: number
 *           description: The user phone number
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         response: User successfully Signed up
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     UserLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The user email
 *         password:
 *           type: string
 *           description: The user password
 *       example:
 *         response: User successfully logged in
 */



/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserSignup'
 *     responses:
 *       200:
 *         description: The user was created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserSignup'
 *       500:
 *         description: Some server error
 */
 router.post('/signup', usercontroller.newUser);

 /**
  * @swagger
  * /api/user/login:
  *   post:
  *     summary:  login an existing user
  *     tags: [User]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/UserLogin'
  *     responses:
  *       200:
  *         description: The user is logged in successfully
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/UserLogin'
  *       500:
  *         description: Some server error
  */
 router.post('/login', usercontroller.loginUser);

 /* 
 SignIn
 */
/**
  * @swagger
  * /api/user/auth/google:
  *   post:
  *     summary:  login with google
  *     tags: [User]
  *     responses:
  *       200:
  *         description: The user is logged in successfully
  *         content:
  *           application/json:
  *             schema:
  *               $ref: '#/components/schemas/UserLogin'
  *       500:
  *         description: Some server error
  */
 router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
 }));

 /* 
 Callback from Google
 */
 router.get('/auth/google/callback', passport.authenticate('google', {
   failureRedirect:'/login'
}), (req, res) => {
   res.redirect('/home')
});

 /* 
 logout
 */

 //get users
 router.get('/customers', usercontroller.getusers)
 //get user profile
 router.get('/customer/:id', usercontroller.getuser)
 //get requests
 router.get('/requesthistory/:id', usercontroller.history)


 


 module.exports = router;