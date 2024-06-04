// src/components/CarForm.js
import React, { useState } from "react";
import axios from "axios";

const CarForm = () => {
  // State variable for form data
  const [formData, setFormData] = useState({
    Model: "",
    Make: "",
    Owner: "",
    Registration: "",
    Address: "",
  });

  // Event handler for input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Submit handler for adding a new car
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/cars/", formData);
    } catch (error) {
      console.error("Error adding car:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Input field for Model */}
      <input
        type="text"
        name="Model"
        placeholder="Model (Year)"
        value={formData.Model}
        onChange={handleChange}
      />
      {/* Other input fields for Make, Owner, Registration, and Address */}
      <input
        type="text"
        name="Make"
        placeholder="Make"
        value={formData.Make}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Owner"
        placeholder="Owner"
        value={formData.Owner}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Registration"
        placeholder="Registration"
        value={formData.Registration}
        onChange={handleChange}
      />
      <input
        type="text"
        name="Address"
        placeholder="Address"
        value={formData.Address}
        onChange={handleChange}
      />

      <button type="submit">Add Car</button>
    </form>
  );
};

export default CarForm;
