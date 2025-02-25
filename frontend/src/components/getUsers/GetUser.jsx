import React, { useState, useEffect } from 'react';
import './GetUser.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const GetUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Adding a query parameter to avoid caching issues
        const response = await axios.get(`http://localhost:8000/api/getAllUserDriver`);
        console.log("Fetched users:", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:8000/api/deleteUserDriverById/${userId}`)
    .then((response)=>{
      setUsers((prevUser)=>prevUser.filter((user)=>user._id !== userId))
      toast.success(response.data.message,{position:"top-right"})
    })
    .catch((error)=>{
      console.log(error);      
    });
  };


  return (    
    <div className="users-container">
      {/* If there are no users, this will render a blank container */}
      {users.length > 0 && <h2>Registered Drivers</h2>}
      <div className="user-cards">
        {users.map((user) => (
          <div key={user._id} className="user-card">
            <h2>Driver Details</h2>
            <p>
              <strong>First Name:</strong> {user.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {user.lastName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            {/* <p>
              <strong>Contact:</strong> {user.contact}
            </p> */}
            <p>
              <strong>Location:</strong> {user.location}
            </p>
            <p>
              <strong>Available Time:</strong> {user.availTime}
            </p>
            <p>
              <strong>Pricing Per Route:</strong> {user.pricingPerRoute}
            </p>
      
            <div className="card-buttons">
              <Link to={`/updateUserDriverById/`+user._id} className="text-white p-2 rounded-2xl bg-blue-500 update-btn">
                Update
              </Link>
              <button onClick={() => deleteUser(user._id)} className="text-white p-2 rounded-2xl bg-yellow-500 delete-btn">
                Delete
              </button>
              <Link to="/appointmentForm" className="green-btn">
                Book a driver
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetUser;



