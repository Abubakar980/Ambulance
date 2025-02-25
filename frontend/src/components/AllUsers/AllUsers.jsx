import React, { useState, useEffect } from 'react';
import './AllUsers.css';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getAllUser");
        setUsers(response.data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchData();
  }, []);

  const location = useLocation(); // موجودہ route حاصل کریں

  const handleUpdate = () => {
    alert("Update function triggered!");
  };

  const handleDelete = () => {
    alert("Delete function triggered!");
  };

  return (
    <div>
      {/* Register page پر user card نہ دکھائیں */}
      {location.pathname !== "/register" && (
        <div className="user-cards">
          {users.map((user, index) => (
            <div key={user._id} className="user-card">
              <h2>User Details</h2>
              <p><strong>{index + 1}</strong></p>
              <p><strong>First Name:</strong> {user.firstName}</p>
              <p><strong>Last Name:</strong> {user.lastName}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Contact:</strong> {user.contact}</p>
              <p><strong>Location:</strong> {user.location}</p>
              <p><strong>Pricing Per Route:</strong> {user.pricingPerRoute}</p>
              <p><strong>Available Time:</strong> {user.availTime}</p>
              <p><strong>First File:</strong> {user.documentOne}</p>
              <p><strong>Second File:</strong> {user.documentTwo}</p>

              <div className="user-card-buttons">
                <button className="update-btn" onClick={handleUpdate}>Update</button>
                <button className="delete-btn" onClick={handleDelete}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllUsers;
