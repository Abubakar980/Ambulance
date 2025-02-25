import React from "react";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";

const Main = () => {
  return (
    <main className="ml-[200px] p-9 text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-3 bg-gray-900 shadow-md text-black">
        <h3 className="font-bold text-lg">Home</h3>
        <div className="flex items-center space-x-3">
          <FaBell className="text-gray-600" />
          <span>Admin</span>
          <img src="cab.jpg" alt="Admin" className="w-10 h-10 rounded-full object-cover" />
        </div>
      </header>

      {/* Dashboard Overview */}
      <section className="mt-5">
        <h2 className="text-2xl font-bold text-white mb-5">Dashboard Overview</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { title: "Total Users", count: "1,200", desc: "Registered users", link: "/AdminSignupUsers" },
            { title: "Total Drivers", count: "150", desc: "Registered drivers", link: "/adminactiveDrivers" },
            { title: "Total Appointments", count: "500", desc: "Appointments booked", link: "/adminappointments" },
          ].map((card, index) => (
            <div key={index} className="bg-gray-900 text-black p-6 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <p className="text-3xl font-bold my-2">{card.count}</p>
              <p className="text-gray-600 mb-3">{card.desc}</p>
              <Link className="py-2 px-4 bg-blue-800 text-white rounded-md inline-block" to={card.link}>
                View All
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Main;
