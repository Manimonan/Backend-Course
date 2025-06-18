// Core Module
const path = require('path');

// External Module
const express = require('express');


//Local Module
const userRouter = require("./routes/userRouter")
const {hostRouter} = require("./routes/hostRouter")
const rootDir = require("./utils/pathUtil");
const errorContoller = require("./Controller/error")
 
const app = express();

// db.execute("SELECT * FROM homes")
// .then(([rows,fields])=>{
//   console.log(rows);
//   //console.log(fields)
// })
// .catch((error)=>{
//   console.log("Error to feching data ",error)
// })
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded());
app.use(userRouter);
app.use("/host", hostRouter);

app.use(express.static(path.join(rootDir, 'public')))

app.use(errorContoller.errorPage)

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});