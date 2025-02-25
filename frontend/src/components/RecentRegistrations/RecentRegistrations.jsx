import React from "react";

const RecentRegistrations = () => {
  return (
    <div className="overflow-x-auto bg-gray-900 p-5 rounded-lg mb-5 shadow-md ml-60 max-w-7xl">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Registrations</h3>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th className="p-3 text-left">User ID</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Role</th>
            <th className="p-3 text-left">Registration Date</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b">
            <td className="p-3">101</td>
            <td className="p-3">Michael Brown</td>
            <td className="p-3">michael@example.com</td>
            <td className="p-3">Driver</td>
            <td className="p-3">2023-09-20</td>
          </tr>
          <tr className="border-b">
            <td className="p-3">102</td>
            <td className="p-3">Sarah Johnson</td>
            <td className="p-3">sarah@example.com</td>
            <td className="p-3">Appointment Seeker</td>
            <td className="p-3">2023-08-15</td>
          </tr>
        </tbody>
      </table>
      <button className="mt-4 bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition">
        <a href="Allusers.html" className="block text-white">View All Registered Users</a>
      </button>
    </div>
  );
};

export default RecentRegistrations;
