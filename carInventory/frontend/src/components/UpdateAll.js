import React, { useState } from "react";
import axios from "axios";

const UpdateAll = ({ cars, fetchCars }) => {
  // State variables for make and owner
  const [make, setMake] = useState("");
  const [owner, setOwner] = useState("");

  // Event handler for make input change
  const handleMakeChange = (e) => {
    setMake(e.target.value);
  };

  // Event handler for owner input change
  const handleOwnerChange = (e) => {
    setOwner(e.target.value);
  };

  // Submit handler for updating both make and owner
  const handleChangesSubmit = async (e) => {
    e.preventDefault();
    try {
      // Loop through each car and update the make and owner
      for (let car of cars) {
        await axios.put(`http://localhost:5000/cars/${car._id}`, {
          Make: make,
          Owner: owner,
        });
      }
      fetchCars(); // Refresh the car list after updating
    } catch (error) {
      console.error("Error updating cars:", error);
    }
  };

  return (
    <div>
      {/* Form for updating both make and owner */}
      <form onSubmit={handleChangesSubmit}>
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
        <button type="submit">Update Cars</button>
      </form>
    </div>
  );
};

export default UpdateAll;
