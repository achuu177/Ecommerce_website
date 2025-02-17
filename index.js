const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const { apiRouter } = require("./routes/index.js"); // Ensure this is exported correctly in your routes file
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv')
//import {apiRouter}from "./routes/userRoutes.js"

dotenv.config();

const app = express();
app.use(express.json());
app.use(
  cors({
      origin: "http://localhost:5173", 
      methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
      credentials: true,
  })
);
app.use(cookieParser())
const port = 3000;
 // Use environment variable or fallback to 3000

// Middleware

// app.use(cookieParser());

// Connect to Database

dotenv.config("./.env")

const dbpassword = process.env.DB_PASSWORD

mongoose.connect(`mongodb+srv://aswathikp120:${dbpassword}@main.5n3gm.mongodb.net/`)
.then(res=>{
  console.log("DB connected successfully")
}).catch(err=>{
  console.log("DB connection failed")
});

// Routes
app.use("/api", apiRouter);



// Test Route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the Server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});