const express = require("express");
const cors = require("cors");

// Mongoose for MongoDB connection
const mongoose = require("mongoose");

// Local module
const errorContoller = require("./Controller/errorContoller");
const itemsRouter = require("./router/todoItemsRoute");

const app = express();
app.use(express.json());
app.use(cors())
app.use(itemsRouter)
app.use(errorContoller.errorPage);

const MONGO_URL =
  "mongodb+srv://manimohan2056:1996200201@cluster01.o0snebr.mongodb.net/airbnb01?retryWrites=true&w=majority&appName=Cluster01";
const PORT = 4000;
mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error to connect to MongoDB", error);
  });