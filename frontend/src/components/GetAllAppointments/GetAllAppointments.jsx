import React, { useState, useEffect } from 'react';
import './GetAllAppointments.css';
import axios from 'axios';
// import { Link } from 'react-router-dom';
// import toast from 'react-hot-toast';

const GetAllAppointments = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Adding a query parameter to avoid caching issues
        const response = await axios.get(`http://localhost:8000/api/getallappointments`);
        console.log("Fetched users:", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:8000/api/deleteAppointmentById/${userId}`)
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
      {users.length > 0 && <h2>Appointments</h2>}
      <div className="user-cards">
        {users.map((appointment) => (
          <div key={appointment._id} className="user-card">
            <h2>User Details</h2>
            <p>
              <strong>Name:</strong> {appointment.name}
            </p>
            <p>
              <strong>Email:</strong> {appointment.email}
            </p>
            <p>
              <strong>Contact:</strong> {appointment.contact}
            </p>
            <p>
              <strong>Price:</strong> {appointment.price}
            </p>
            <p>
              <strong>Urgency:</strong> {appointment.urgency}
            </p>
            <p>
              <strong>Location:</strong> {appointment.location}
            </p>
      
            <div className="card-buttons">
              {/* <Link to={`/updateUserDriverById/`+user._id} className="update-btn">
                Update
              </Link> */}
              <button onClick={() => deleteUser(appointment._id)} className="delete-btn">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetAllAppointments;

