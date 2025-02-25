import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AdminSignupUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/GetAllSignupUsers`);
        console.log("Fetched users:", response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    await axios.delete(`http://localhost:8000/api/delete/${userId}`)
    .then((response)=>{
      setUsers((prevUser)=>prevUser.filter((user)=>user._id !== userId))
      toast.success(response.data.message,{position:"top-right"})
    })
    .catch((error)=>{
      console.log(error);      
    });
  };

  return (    
    <div className="p-6 px-0 ml-[200px]">
      
      <h2 className="text-2xl font-bold text-white mb-4">User Signups</h2>
      <div className="overflow-x-auto">
        <table className="w-full bg-gray-800 text-white border border-gray-700 shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-900 text-left">
              <th className="px-4 py-2">First Name</th>
              <th className="px-4 py-2">Last Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Password</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t border-gray-700 hover:bg-gray-700">
                <td className="px-4 py-2">{user.firstName}</td>
                <td className="px-4 py-2">{user.lastName}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.contact}</td>
                <td className="px-4 py-2">{user.location}</td>
                <td className="px-4 py-2">{user.password}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button 
                    onClick={() => deleteUser(user._id)} 
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSignupUsers;