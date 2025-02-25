import React from 'react';
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RegisterForm from './components/Register/RegisterForm.jsx'
import GetUser from './components/getUsers/GetUser.jsx';
import UpdateRegisterForm from './components/UpdateUser/UpdateUser.jsx';
import SignUpNormal from './components/SignUpNormal/SignUpNormal.jsx';
import LoginNormal from './components/LoginNormal/LoginNormal.jsx';
import AppointmentForm from './components/AppointmentForm/AppointmentForm.jsx';
import GetAllAppointments from './components/GetAllAppointments/GetAllAppointments.jsx';
import NavAfterReg from './components/NavAfterReg/NavAfterReg.jsx';
import AboutUs from './components/AboutUs/AboutUs.jsx';
import AdminNavbar from './components/AdminNavbar/AdminNavbar.jsx';
import AdminGetUser from './components/AdminGetUser/AdminGetUser.jsx';
import AdminGetAllAppointments from './components/AdminGetAllAppointments/AdminGetAllAppointments.jsx';
import AdminSignupUsers from './components/AdminSignupUsers/AdminSignupUsers.jsx';
import Main from './components/Main/Main.jsx';
import RecentAppointments from './components/RecentAppointments/RecentAppointments.jsx';
import RecentRegistrations from './components/RecentRegistrations/RecentRegistrations.jsx';
import ActiveDrivers from './components/ActiveDrivers/ActiveDrivers.jsx';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavAfterReg/>
    },
    {
      path: "/homebeforereg",
      element: <NavAfterReg/>
    },
    {
      path: "/homeafterreg",
      element: <NavAfterReg/>
    },
    {
      path: "/aboutus",
      element: <><NavAfterReg/><AboutUs/></>
    },
    {
      path: "/register",
      element: <><NavAfterReg/><RegisterForm/></>
    },
    {
      path: "/getAllUserDriver",
      element: <><NavAfterReg/><GetUser/></>
    },
    {
      path: "/getallappointments",
      element: <><NavAfterReg/><GetAllAppointments/></>
    },
    {
      path: "/updateUserDriverById/:id",
      element: <><NavAfterReg/><UpdateRegisterForm/></>
    },
    {
      path: "/appointmentForm",
      element: <><NavAfterReg/><AppointmentForm/></>
    },
    {
      path: "/signupnormal",
      element: <><NavAfterReg/><SignUpNormal/></>
    },
    {
      path: "/signinnormal",
      element: <><NavAfterReg/><LoginNormal/></>
    },
    {
      path: "/loginnormal",
      element: <><NavAfterReg/><LoginNormal/></>
    },



    
    // FOR DASHBOARD
    {
      path: "/admindashboard",
      // element: <><GetAllAppointments/></>
      element: <><AdminNavbar/><Main/><RecentAppointments/><RecentRegistrations/><ActiveDrivers/></>
    },
    {
      path: "/adminactiveDrivers",
      // element: <><GetAllAppointments/></>
      element: <><AdminNavbar/><AdminGetUser/></>
    },
    {
      path: "/adminappointments",
      // element: <><GetAllAppointments/></>
      element: <><AdminNavbar/><AdminGetAllAppointments/></>
    },
    {
      path: "/AdminSignupUsers",
      // element: <><GetAllAppointments/></>
      element: <><AdminNavbar/><AdminSignupUsers/></>
    },
  ])

  return (
    <>
    <RouterProvider router={router}/>  
    </>
  )
}

export default App
