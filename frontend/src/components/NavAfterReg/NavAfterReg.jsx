import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const NavAfterReg = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userEmail = localStorage.getItem("email"); // Retrieve email from storage

    setIsLoggedIn(!!token);
    setIsAdmin(userEmail === "admin123@gmail.com"); // Check if user is admin
  }, [isLoggedIn]); 

  const logout = () => {
    fetch("http://localhost:8000/api/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("email"); // Clear email on logout
        setIsLoggedIn(false);
        setIsAdmin(false);
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  return (
    <nav className="w-full max-w-screen flex items-center justify-around h-[120px] bg-gradient-to-r from-black via-black/90 to-black p-4">
      <div className="flex flex-col items-center gap-1">
        <Link to="/" className="text-[#6d95fc] text-[50px] font-semibold uppercase tracking-tight">
          DANITIC
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/aboutus" className="text-white text-lg font-light px-4 py-2">
          About Us
        </Link>

        {isAdmin && (
          <Link to="/admindashboard" className="text-white text-lg font-light px-4 py-2">
            Dashboard
          </Link>
        )}

        {isLoggedIn ? (
          <>
            <Link to="/register" className="text-white text-lg font-light px-4 py-2">Register As Driver</Link>
            <Link to="/getAllUserDriver" className="text-white text-lg font-light px-4 py-2">All Drivers</Link>
            <Link to="/getallappointments" className="text-white text-lg font-light px-4 py-2">All Appointments</Link>
            <button onClick={logout} className="text-white text-lg font-light px-4 py-2 bg-transparent border-none outline-none cursor-pointer">
              Logout
            </button>
          </>
        ) : (
          <Link to="/signupnormal" className="text-white text-lg font-light px-4 py-2">SignUp Normal</Link>
        )}
      </div>
    </nav>
  );
};

export default NavAfterReg;
