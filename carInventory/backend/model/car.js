// Import the Mongoose library
const mongoose = require("mongoose");

// Define the car schema using Mongoose's Schema class
const carSchema = new mongoose.Schema(
  {
    // Define the fields for the car model
    Model: { type: Number }, // Car model year (optional)
    Make: { type: String, required: true }, // Car make (required)
    Registration: { type: String, required: true }, // Car registration number (required)
    Owner: { type: String, required: true }, // Car owner's name (required)
    Address: { type: String, required: true }, // Car owner's address (required)
  },
  { collection: "cars" } // Specify the MongoDB collection name for this schema
);

// Create a Mongoose model named "Car" based on the carSchema
module.exports = mongoose.model("Car", carSchema);
