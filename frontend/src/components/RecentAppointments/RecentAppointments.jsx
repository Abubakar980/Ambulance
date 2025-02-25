import React from "react";

const RecentAppointments = () => {
  return (
    <div className="overflow-x-auto bg-gray-900 p-5 rounded-lg shadow-md ml-60 mt-5 mb-5 max-w-7xl">
      <h3 className="text-xl font-semibold mb-4">Recent Appointments</h3>
      <table className="w-full border-collapse bg-white text-left">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="p-3">Driver ID</th>
            <th className="p-3">Driver Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Phone Number</th>
            <th className="p-3">License Number</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2].map((id) => (
            <tr key={id} className="border-b hover:bg-gray-100">
              <td className="p-3">{id}</td>
              <td className="p-3">ABC</td>
              <td className="p-3">abcn@gmail.com</td>
              <td className="p-3">0311257844447</td>
              <td className="p-3">LMN23456</td>
              <td className="p-3 text-green-600 font-semibold">Active</td>
              <td className="p-3">
                <button className="text-blue-600 mr-2">✔</button>
                <button className="text-red-600">🗑</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-4 px-4 py-2 bg-blue-900 text-white rounded hover:bg-blue-800">
        <a href="appointments.html">View All Appointments</a>
      </button>
    </div>
  );
};

export default RecentAppointments;