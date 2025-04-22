
// External Module
const express = require('express');
const userRouter = express.Router();


// Local Module

const homeController = require('../Controller/Homes')


userRouter.get("/", homeController.getHomes);

module.exports = userRouter;