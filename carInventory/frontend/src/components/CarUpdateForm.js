// src/components/CarUpdateForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const CarUpdateForm = ({ car, fetchCars }) => {
  // State variables for address, make, and owner
  const [address, setAddress] = useState("");
  const [make, setMake] = useState("");
  const [owner, setOwner] = useState("");

  // Set the initial address when the car prop changes
  useEffect(() => {
    setAddress(car.Address);
  }, [car]);

  // Set the initial make and owner when the car prop changes
  useEffect(() => {
    setMake(car.Make);
    setOwner(car.Owner);
  }, [car]);

  // Event handler for make input change
  const handleMakeChange = (e) => {
    setMake(e.target.value);
  };

  // Event handler for owner input change
  const handleOwnerChange = (e) => {
    setOwner(e.target.value);
  };

  // Submit handler for updating both make and owner
  const handleTwoChangesSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/cars/${car._id}`, {
        Make: make,
        Owner: owner,
      });
      fetchCars(); // Refresh the car list after updating
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  // Event handler for address input change
  const handleChange = (e) => {
    setAddress(e.target.value);
  };

  // Submit handler for updating address
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/cars/${car._id}/address`, {
        Address: address,
      });
      fetchCars(); // Refresh the car list after updating
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  return (
    <div>
      <div>
        {/* Form for updating address */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="Address"
            placeholder="Address"
            value={address}
            onChange={handleChange}
          />
          <button type="submit">Update Address</button>
        </form>
      </div>
      <div>
        {/* Form for updating both make and owner */}
        <form onSubmit={handleTwoChangesSubmit}>
          <input
            type="text"
            name="Make"
            placeholder="Make"
            value={make}
            onChange={handleMakeChange}
          />
          <input
            type="text"
            name="Owner"
            placeholder="Owner"
            value={owner}
            onChange={handleOwnerChange}
          />
          <button type="submit">Update Car & Name</button>
        </form>
      </div>
    </div>
  );
};

export default CarUpdateForm;
