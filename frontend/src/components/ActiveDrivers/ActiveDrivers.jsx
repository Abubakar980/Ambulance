import React from "react";

const ActiveDrivers = () => {
  return (
    <div className="overflow-x-auto bg-gray-900 p-5 rounded-lg shadow-md ml-60 max-w-7xl">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Active Drivers</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="p-3 text-left">Driver ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Vehicle Details</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="p-3">001</td>
              <td className="p-3">John Doe</td>
              <td className="p-3">Car - ABC123</td>
              <td className="p-3 text-green-600 font-semibold">Available</td>
              <td className="p-3">
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                  🗑 Remove
                </button>
              </td>
            </tr>
            <tr className="border-b">
              <td className="p-3">002</td>
              <td className="p-3">Jane Smith</td>
              <td className="p-3">Bike - XYZ456</td>
              <td className="p-3 text-yellow-500 font-semibold">Busy</td>
              <td className="p-3">
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                  🗑 Remove
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <a href="drivers.html" className="inline-block bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          View All Drivers
        </a>
      </div>
    </div>
  );
};

export default ActiveDrivers;
