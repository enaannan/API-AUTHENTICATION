// import libraries
const express = require("express");
const app = express();
const https = require('https');
const fs = require('fs');
const connectDB = require("./db");
const cookieParser = require("cookie-parser");
const { adminJWTAuth, userJWTAuth } = require("./middleware/jwtAuth.js");

// extract json from body
app.use(express.json());

app.use(cookieParser());

// read env variables from config file
const { port } = require('./config');

// adding routes
app.use("/api/auth", require("./Auth/Route"));

app.get("/admin", adminJWTAuth, (req, res) => res.send("Admin Route"));
app.get("/basic", userJWTAuth, (req, res) => res.send("User Route"));
app.get("/logout", (req, res) => {res.cookie("jwt", "", { maxAge: "1" })
res.redirect("/")
})


//Connecting the Database
connectDB();

// set options for https server
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

// creating expresss https server that listens on port 8000
https.createServer(options,app).listen(port, ()=>{
    console.log('server is runing at port 8000')
  });

// Handling Error
process.on("unhandledRejection", err => {
    console.log(`An error occurred: ${err.message}`)
    server.close(() => process.exit(1))
  })

//   try route
app.get('/', (req,res)=>{
    res.send("Hello from express server.")
})
