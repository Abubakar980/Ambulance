import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminGetAllAppointments = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
        toast.success(response.data.message, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-6 ml-[200px] mt-5 mb-5">
      <h2 className="text-2xl font-bold text-white mb-4">Appointments:</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-800 text-white border border-gray-700 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-900 text-left">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Urgency</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t border-gray-700 hover:bg-gray-700">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.contact}</td>
                <td className="px-4 py-2">{user.price}</td>
                <td className="px-4 py-2">{user.urgency}</td>
                <td className="px-4 py-2">{user.location}</td>
                <td className="px-4 py-2 flex gap-2">
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
                    Approve
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

export default AdminGetAllAppointments;
