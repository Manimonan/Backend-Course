
// External Module
const express = require('express');
const userRouter = express.Router();


// Local Module

const homeController = require('../Controller/userController')


userRouter.get("/", homeController.getHomes);
userRouter.get("/bookings", homeController.getBookings);
userRouter.get("/favorites", homeController.getFavorites);
userRouter.post("/favorites", homeController.addToFavorites);
userRouter.get("/home/:homeId",homeController.getHomeDetails);
userRouter.post("/favorite/delete/:homeId",homeController.postRemoveFromFavorites);

module.exports = userRouter;