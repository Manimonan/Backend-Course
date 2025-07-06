// External module
const express = require("express")

//Local module

const authController = require('../Controller/authController')


const authRouter = express.Router();

authRouter.get('/login',authController.getLogin)
authRouter.post('/login',authController.postLogin)
authRouter.post('/logout',authController.postLogout)
authRouter.get('/signup',authController.getSignup)
authRouter.post('/signup',authController.postSignUp)
module.exports = authRouter;