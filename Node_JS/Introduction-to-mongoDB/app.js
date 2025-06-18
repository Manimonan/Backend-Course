// Core Module
const path = require('path');

// External Module
const express = require('express');
const {mongoConnect} = require("./utils/dataBaseUtils");
//Local Module
const userRouter = require("./routes/userRouter")
const {hostRouter} = require("./routes/hostRouter")
const rootDir = require("./utils/pathUtil");
const errorContoller = require("./Controller/error")

 
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(userRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')))

app.use(errorContoller.errorPage)

const PORT = 3002;
mongoConnect(()=>{
console.log("connected to mongoDB")
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
})
