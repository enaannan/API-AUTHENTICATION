// import libraries
const express = require("express");
const app = express();
const https = require('https');
const fs = require('fs');
const connectDB = require("./db");

// extract json from body
app.use(express.json())
 
// adding routes
app.use("/api/auth", require("./Auth/Route"))


//Connecting the Database
connectDB();

// set options for https server
const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

// creating expresss https server that listens on port 8000
https.createServer(options,app).listen(8000, ()=>{
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