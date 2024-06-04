// src/App.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // Import your CSS file (adjust the path as needed)
import CarForm from "./components/CarForm";
import CarUpdateForm from "./components/CarUpdateForm";
import UpdateAll from "./components/UpdateAll"; // Import the new component

const App = () => {
  // State variables for cars and olderCars
  const [cars, setCars] = useState([]);
  const [olderCars, setOlderCars] = useState([]);

  // Fetch car data from the backend
  const fetchCars = () => {
    axios
      .get("http://localhost:5000/cars") // Adjust the URL as needed
      .then((response) => setCars(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  // Delete a car by ID
  const deleteCar = (id, owner) => {
    if (window.confirm(`Are you sure you want to delete ${owner}'s car?`)) {
      axios
        .delete(`http://localhost:5000/cars/${id}`)
        .then(() => {
          fetchCars(); // Refresh the car list after deletion
        })
        .catch((error) => console.error("Error deleting car:", error));
    }
  };

  // Fetch older cars (cars older than 5 years)
  const fetchOlderCars = () => {
    axios
      .get("http://localhost:5000/cars/older-than-5") // Adjust the URL as needed
      .then((response) => setOlderCars(response.data))
      .catch((error) => console.error("Error fetching older cars:", error));
  };

  // Call fetchOlderCars in useEffect to load data on component mount
  useEffect(() => {
    fetchCars();
    fetchOlderCars();
  }, []);

  return (
    <div className="App">
      <h1>Car Inventory App</h1>

      {/* Table for displaying car data */}
      <table className="table">
        <thead className="tableHead">
          <tr className="tableHeadRow">
            <th>Model</th>
            <th>Make</th>
            <th>Owner</th>
            <th>Registration</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="tableBody">
          {cars.map((car) => (
            <tr key={car._id} className="tableBodyRow">
              <td>{car.Model}</td>
              <td>{car.Make}</td>
              <td>{car.Owner}</td>
              <td>{car.Registration}</td>
              <td>{car.Address}</td>
              <td>
                <button onClick={() => deleteCar(car._id, car.Owner)}>
                  Delete
                </button>
                <CarUpdateForm car={car} fetchCars={fetchCars} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form for adding a new car */}
      <div className="addCar">
        <CarForm fetchCars={fetchCars} />
      </div>

      {/* Form for updating multiple cars */}
      <div className="updateCars">
        <UpdateAll cars={cars} fetchCars={fetchCars} />
      </div>

      {/* Display older cars */}
      <h2>Cars Older Than 5 Years</h2>
      <table className="table">
        <thead className="tableHead">
          <tr className="tableHeadRow">
            <th>Model</th>
            <th>Make</th>
            <th>Registration</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody className="tableBody">
          {olderCars.map((car) => (
            <tr key={car._id} className="tableBodyRow">
              <td>{car.Model}</td>
              <td>{car.Make}</td>
              <td>{car.Registration}</td>
              <td>{car.Owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;



// // src/App.js
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./App.css"; 
// import CarForm from "./components/CarForm";
// import CarUpdateForm from "./components/CarUpdateForm";

// const App = () => {
//   // State variables for cars and olderCars
//   const [cars, setCars] = useState([]);
//   const [olderCars, setOlderCars] = useState([]);

//   // Fetch car data from the backend
//   const fetchCars = () => {
//     axios
//       .get("http://localhost:5000/cars") // Adjust the URL as needed
//       .then((response) => setCars(response.data))
//       .catch((error) => console.error("Error fetching data:", error));
//   };

//   // Delete a car by ID
//   const deleteCar = (id, owner) => {
//     if (window.confirm(`Are you sure you want to delete ${owner}'s car?`)) {
//       axios
//         .delete(`http://localhost:5000/cars/${id}`)
//         .then(() => {
//           fetchCars(); // Refresh the car list after deletion
//         })
//         .catch((error) => console.error("Error deleting car:", error));
//     }
//   };

//   // Fetch older cars (cars older than 5 years)
//   const fetchOlderCars = () => {
//     axios
//       .get("http://localhost:5000/cars/older-than-5") // Adjust the URL as needed
//       .then((response) => setOlderCars(response.data))
//       .catch((error) => console.error("Error fetching older cars:", error));
//   };

//   // Call fetchOlderCars in useEffect to load data on component mount
//   useEffect(() => {
//     fetchCars();
//     fetchOlderCars();
//   }, []);

//   return (
//     <div className="App">
//       <h1>Car Inventory App</h1>

//       {/* Table for displaying car data */}
//       <table className="table">
//         <thead className="tableHead">
//           <tr className="tableHeadRow">
//             <th>Model</th>
//             <th>Make</th>
//             <th>Owner</th>
//             <th>Registration</th>
//             <th>Address</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody className="tableBody">
//           {cars.map((car) => (
//             <tr key={car._id} className="tableBodyRow">
//               <td>{car.Model}</td>
//               <td>{car.Make}</td>
//               <td>{car.Owner}</td>
//               <td>{car.Registration}</td>
//               <td>{car.Address}</td>
//               <td>
//                 <button onClick={() => deleteCar(car._id, car.Owner)}>
//                   Delete
//                 </button>
//                 <CarUpdateForm car={car} fetchCars={fetchCars} />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Form for adding a new car */}
//       <div className="addCar">
//         <CarForm fetchCars={fetchCars} />
//       </div>

//       {/* Display older cars */}
//       <h2>Cars Older Than 5 Years</h2>
//       <table className="table">
//         <thead className="tableHead">
//           <tr className="tableHeadRow">
//             <th>Model</th>
//             <th>Make</th>
//             <th>Registration</th>
//             <th>Owner</th>
//           </tr>
//         </thead>
//         <tbody className="tableBody">
//           {olderCars.map((car) => (
//             <tr key={car._id} className="tableBodyRow">
//               <td>{car.Model}</td>
//               <td>{car.Make}</td>
//               <td>{car.Registration}</td>
//               <td>{car.Owner}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default App;
