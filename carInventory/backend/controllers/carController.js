// Import the Express framework
const express = require("express");
const router = express.Router(); // Create an Express router
const Car = require("../model/car"); // Import the Car model

// List all cars
router.get("/", async (req, res) => {
  try {
    // Retrieve all cars from the database using Car.find()
    const cars = await Car.find();
    res.json(cars); // Respond with a JSON array containing car data
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors with a 500 status code
  }
});

// Create a new car
router.post("/", async (req, res) => {
  try {
    // Create a new Car instance with data from the request body
    const car = new Car(req.body);
    await car.save(); // Save the car to the database
    res.status(201).json(car); // Respond with a 201 status code and the newly created car data
  } catch (err) {
    res.status(400).json({ error: err.message }); // Handle validation errors with a 400 status code
  }
});

router.get("/older-than-5", async (req, res) => {
  try {
    // Fetch one car and log the type of its 'Model' field
    const car = await Car.findOne({});
    console.log(typeof car.Model); // Log the type of the 'Model' field

    // Query the database for cars older than 5 years
    const olderCars = await Car.find({
      Model: { $lt: new Date().getFullYear() - 5 }, // Using $lt (less than) operator
    }).select("Model Make Registration Owner"); // Select only the required fields

    res.json(olderCars); // Respond with a JSON array containing older cars
  } catch (err) {
    res.status(500).json({ error: err.message }); // Handle errors with a 500 status code
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const carId = req.params.id; // Extract car ID from the request parameters

    // Find and delete the car by its ID
    const deletedCar = await Car.findByIdAndDelete(carId);
    if (!deletedCar) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.status(204).send(); // Respond with a 204 status code (no content) for successful deletion
  } catch (err) {
    res.status(400).json({ error: err.message }); // Handle errors with a 400 status code
  }
});

// Express route to update a car's address
router.put("/:_id/address", async (req, res) => {
  const _id = decodeURIComponent(req.params._id);
  try {
    const updatedCar = await Car.findOneAndUpdate(
      { _id: _id },
      { $set: { Address: req.body.Address } }, // Use $set to update the address
      { new: true }
    );
    if (!updatedCar) {
      return res.status(404).json({ error: "Car not found" });
    }
    res.json(updatedCar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// router.put("/:_id", async (req, res) => {
//   const _id = decodeURIComponent(req.params._id);
//   try {
//     const updatedCar = await Car.findOneAndUpdate(
//       { _id: _id },
//       { $set: { Make: req.body.Make, Owner: req.body.Owner } }, // Use $set to update the Make and Owner
//       { new: true }
//     );
//     if (!updatedCar) {
//       return res.status(404).json({ error: "Car not found" });
//     }
//     res.json(updatedCar);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// PUT route for updating multiple cars
router.put('/multiple', async (req, res) => {
  const { carIds, make, owner } = req.body;

  try {
    // Loop through each carId and update the make and owner
    for (let carId of carIds) {
      await Car.findByIdAndUpdate(carId, { Make: make, Owner: owner });
    }

    res.status(200).json({ message: 'Cars updated successfully' });
  } catch (error) {
    console.error("Error updating cars:", error);
    res.status(500).json({ message: 'Error updating cars' });
  }
});

router.put("/:_id", async (req, res) => {
  const _id = decodeURIComponent(req.params._id);
  try {
    const updatedCars = await Car.updateMany(
      { _id: _id },
      { $set: { Make: req.body.Make, Owner: req.body.Owner } }, // Use $set to update the Make and Owner
    );
    if (updatedCars.nModified == 0) {
      return res.status(404).json({ error: "No cars found to update" });
    }
    res.json({ message: `Updated ${updatedCars.nModified} cars` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router; // Export the router for use in other parts of the application

// // controllers/carController.js
// const express = require("express");
// const Car = require("../model/car"); // Import your Car model
// const app = express();
// const bodyParser = require("body-parser");

// // Routes
// // app.greeting("/", (req, res) => {
// //   res.send("Welcome to the Car Inventory API!");
// // });

// // List all cars
// app.getAllCars = async (req, res) => {
//   try {
//     const cars = await Car.find(); // Use the correct variable name
//     res.json(cars);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // Create a new car
// app.createNewCar = async (req, res) => {
//   try {
//     const car = new Car(req.body);
//     await car.save();
//     res.status(201).json(car);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Update a car by ID
// app.updateCar = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updatedCar = await Car.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });
//     res.json(updatedCar);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // Delete a car by ID
// app.deleteCar = async (req, res) => {
//   try {
//     const { id } = req.params;
//     await Car.findByIdAndDelete(id);
//     res.status(204).send();
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

// // List older cars (older than 5 years)
// app.olderThan = async (req, res) => {
//   try {
//     const olderCars = await Car.find({
//       model: { $lt: new Date().getFullYear() - 5 },
//     });
//     console.log("Found older cars:", olderCars);
//     res.json(olderCars);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
