// Import necessary modules
const express = require("express"); // Express framework for building web applications
const mongoose = require("mongoose"); // Mongoose for MongoDB interaction
const bodyParser = require("body-parser"); // Middleware for parsing request bodies
const carController = require("./controllers/carController"); // Custom car controller
const cors = require("cors");

// Create an Express app
const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
const mongodb =
  "mongodb+srv://lefataleni:seceret123@myfirstcluster.yv2btaq.mongodb.net/test";

// Set the port for the server (use environment variable or default to 5000)
const PORT = process.env.PORT || 5000;

// Use bodyParser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Connect to MongoDB using Mongoose
mongoose.connect(mongodb);

// Set up MongoDB connection event listeners
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:")); // Handle connection errors
db.once("open", () => {
  console.log("Connected to MongoDB Atlas"); // Log a successful connection
});

// Define routes
app.use("/cars", carController); // Use the carController for routes starting with "/cars"

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Your server is running on port ${PORT}`);
});
