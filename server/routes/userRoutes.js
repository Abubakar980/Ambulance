import express from 'express';


import { createUserDriver, deleteUserDriver, getAllUserDriver, getUserDriverById, updateUserDriver } from "../controller/userController.js";
import { createAppointment, deleteAppointment, getAllAppointments, getAppointmentById, updateAppointment } from "../controller/userController.js";
import { signup, signin, logout, GetAllSignupUsers } from "../controller/userController.js";


import { verifyToken } from "../middlewares/authMiddleware.js";  // Import middleware
import { getUserProfile, updateUser, deleteUser } from "../controller/userController.js";


const route = express.Router();

// UserDriver Routes
route.post("/createUserDriver", createUserDriver);
route.get("/getAllUserDriver", getAllUserDriver);
route.delete("/deleteUserDriverById/:id", deleteUserDriver);
route.get("/getUserDriverById/:id", getUserDriverById);
route.put("/updateUserDriverById/:id", updateUserDriver);

// Appointment Routes
route.post("/createAppointment", createAppointment);
route.get("/getAllAppointments", getAllAppointments);
route.get("/getAppointmentById/:id", getAppointmentById);
route.put("/updateAppointmentById/:id", updateAppointment);
route.delete("/deleteAppointmentById/:id", deleteAppointment);

// Signup Sign Routes
route.post("/signup", signup);
route.get("/GetAllSignupUsers", GetAllSignupUsers);
route.post("/signin", signin);
route.post("/logout", verifyToken, logout);


// ✅ Protected Routes (Authentication Required)
route.get("/profile", verifyToken, getUserProfile);
route.put("/update/:id", verifyToken, updateUser);
// route.delete("/delete/:id", verifyToken, deleteUser);
route.delete("/delete/:id", deleteUser);

export default route;