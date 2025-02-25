import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { FaBars, FaHome, FaCar, FaCalendarCheck, FaUsers } from "react-icons/fa";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 p-2 hover:cursor-pointer rounded-md shadow-md md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars className="text-gray-700 text-xl" />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-[#3C3C3C;] text-black shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0`}
      >
        <div className="p-4">
          <Link className="text-white" to="/">Home</Link>
          <h2 className="px-3 text-white mt-2.5 font-bold text-2xl">Admin Panel</h2>
        </div>
        <nav>
          <ul className="space-y-2"> {/* Added padding-left here */}
            <li className="hover:bg-gray-500 hover:text-white text-white rounded-xl p-2">
              <Link className="flex items-center gap-2 px-4" to="/admindashboard">
                <FaHome /> Home
              </Link>
            </li>
            <li className="hover:bg-gray-500 hover:text-white text-white rounded-xl p-2">
              <Link className="flex items-center gap-2 px-4" to="/adminactiveDrivers">
                <FaCar /> Drivers
              </Link>
            </li>
            <li className="hover:bg-gray-500 hover:text-white text-white rounded-xl p-2">
              <Link className="flex items-center gap-2 px-4" to="/adminappointments">
                <FaCalendarCheck /> Appointments
              </Link>
            </li>
            <li className="hover:bg-gray-500 hover:text-white text-white rounded-xl p-2">
              <Link className="flex items-center gap-2 px-4" to="/AdminSignupUsers">
                <FaUsers /> All Signup Users
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default AdminNavbar;
