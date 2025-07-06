// Core Module
const path = require("path");

// External Module
const PORT = 3002;
const MONGO_URL =
  "mongodb+srv://manimohan2056:1996200201@cluster01.o0snebr.mongodb.net/airbnb01?retryWrites=true&w=majority&appName=Cluster01";
const express = require("express");
const session = require("express-session");
const MongoDBStore = require('connect-mongodb-session')(session);

//Local Module
const userRouter = require("./routes/userRouter");
const { hostRouter } = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const errorContoller = require("./Controller/error");
const { default: mongoose } = require("mongoose");
const authRouter = require("./routes/authRouter");

const app = express();
// Middleware
app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded());

const store =new MongoDBStore({
  uri:MONGO_URL,
  collection: 'sessions',
})

app.use(
  session({
    secret: "airbnb-secret-key",
    resave: false,
    saveUninitialized: true,
    store:store
  })
);
app.use((req, res, next) => {
  // for Session
  req.isLoggedIn = req.session.isLoggedIn;
  //for Cookis 
  // req.isLoggedIn = req.get("Cookie")
  //   ? req.get("Cookie").split("=")[1] === "true"
  //   : "false";
  next();
});
app.use(authRouter);
app.use(userRouter);
app.use("/host", (req, res, next) => {
  if (req.isLoggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
});
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, "public")));

app.use(errorContoller.errorPage);



mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Error to connect to MongoDB", error);
  });
