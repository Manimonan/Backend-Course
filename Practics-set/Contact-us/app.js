// External modules
const express = require("express");

// local modules


//Create app using express
const app = express();

// Middleware
app.use((req,res,next)=>{
    console.log("My first dummy middleware",req.method,req.url);
    next();
})
app.use((req,res,next)=>{
    console.log("My second dummy middleware",req.method,req.url);
    next();
})
// app.use((req,res,next)=>{
//     console.log("My third  middleware",);
//     //res.send("<h1>Hello from third middleware</h1>");
    
// });

// Routes
app.get("/",(req,res,next)=>{
    res.send("<h1>Hello from home page</h1>");
});

app.get("/contact",(req,res)=>{
   res.send(`<h1>Hello from contact page please fill below inputs</h1>

             <div>
                <form action="/contact" method="POST">
                    <input type="text" name="name" placeholder="Enter your name"/>
                    <input type="email" name="email" placeholder="Enter your email"/>
                    <input type="text" name="message" placeholder="Enter your message"/>
                    <button type="submit">Submit</button>
                </form>
             </div>
            `);
});
app.post("/contact",(req,res)=>{
    res.send("<h1>Thank you for your message</h1>");
});

// Create server using express
const PORT = 3001;
app.listen(PORT,()=>{
    console.log(`server is running on address http://localhost:${PORT}`);
})
