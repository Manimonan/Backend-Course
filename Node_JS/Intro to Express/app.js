// core modules
//const http = require("http");

// External modules
const express = require("express");

const app = express(); // create an express app

// add Middleware 
app.use((req,res,next) =>{
    console.log(" came in first middleware", req.url , req.method);
   // res.send("<h1>hello from express</h1>") // send a response to the client
    next(); // call the next middleware in the stack
})

app.use((req,res,next) =>{
  console.log(" came in second middleware", req.url , req.method);
  //res.send("<h1>hello from express's second middleware</h1>") // send a response to the client
  next(); // call the next middleware in the stack
})

app.use((req,res,next) =>{
  console.log(" came in third middleware", req.url , req.method);
  res.send("<h1>hello from express's third middleware</h1>") // send a response to the client
   
})
//const server = http.createServer(app); // create a server using the express app

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`server is running on address http://localhost:${PORT}`);
});
