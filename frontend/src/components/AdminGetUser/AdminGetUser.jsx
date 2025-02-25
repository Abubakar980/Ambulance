import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminGetUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/getAllUserDriver`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:8000/api/deleteUserDriverById/${userId}`)
      .then((response) => {
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        toast.success(response.data.message, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-6 ml-[200px]">
      <h2 className="text-2xl font-bold text-white mb-4">Registered Drivers</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-800 text-white border border-gray-700 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-900 text-left">
              <th className="px-6 py-3">First Name</th>
              <th className="px-6 py-3">Last Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Available Time</th>
              <th className="px-6 py-3">Pricing Per Route</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t border-gray-700 hover:bg-gray-700">
                <td className="px-6 py-3">{user.firstName}</td>
                <td className="px-6 py-3">{user.lastName}</td>
                <td className="px-6 py-3">{user.email}</td>
                <td className="px-6 py-3">{user.location}</td>
                <td className="px-6 py-3">{user.availTime}</td>
                <td className="px-6 py-3">{user.pricingPerRoute}</td>
                <td className="px-6 py-3 flex gap-2">
                  <button 
                    onClick={() => deleteUser(user._id)} 
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                  <Link 
                    to="/appointmentForm" 
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  >
                    Book Driver
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminGetUser;

