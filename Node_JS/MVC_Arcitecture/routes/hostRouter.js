

// External Module
const express = require('express');
const hostRouter = express.Router();

// Local Module

const homeController = require('../Controller/Homes')

hostRouter.get("/add-home",homeController.getAddHome) 



hostRouter.post("/add-home",homeController.postAddHome)
 

exports.hostRouter = hostRouter;

