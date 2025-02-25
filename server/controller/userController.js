import {UserDriver, Appointment, UserSignup} from "../models/userModel.js"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


//--------------UserDriver-------------//


// CREATE USER DRIVER
export const createUserDriver = async (req, res) => {
    try {
        console.log("Received Data:", req.body);
        const newUserDriver = new UserDriver(req.body);
        const { email } = newUserDriver;

        const userExist = await UserDriver.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "UserDriver already exists" });
        }

        const saveData = await newUserDriver.save();
        res.status(200).json(saveData);
    } catch (error) {
        console.error("Error in create function:", error);
        res.status(500).json({ errorMessage: error.message });
    }
};

// DELETE USER DRIVER
export const deleteUserDriver = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await UserDriver.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "UserDriver data not found." });
        }
        await UserDriver.findByIdAndDelete(id);
        res.status(200).json({ message: "UserDriver deleted Successfully" });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// GET ALL USER DRIVERS
export const getAllUserDriver = async (req, res) => {
    try {
        const userData = await UserDriver.find();
        if (!userData || userData.length === 0) {
            return res.status(404).json({ message: "UserDriver data not found." });
        }
        res.status(200).json(userData);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// GET USER DRIVER BY ID
export const getUserDriverById = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await UserDriver.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "UserDriver not found." });
        }
        res.status(200).json(userExist);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// UPDATE USER DRIVER
export const updateUserDriver = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await UserDriver.findById(id);
        if (!userExist) {
            return res.status(404).json({ message: "UserDriver data not found." });
        }
        await UserDriver.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: "UserDriver Updated successfully." });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};


/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////


//--------------Appointment-------------//

// CREATE APPOINTMENT
export const createAppointment = async (req, res) => {
    try {
        console.log("Received Data:", req.body);
        const newUserDriver = new Appointment(req.body);
        const { email } = newUserDriver;

        const userExist = await Appointment.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "UserDriver already exists" });
        }

        const saveData = await newUserDriver.save();
        res.status(200).json(saveData);
    } catch (error) {
        console.error("Error in create function:", error);
        res.status(500).json({ errorMessage: error.message });
    }
};

// DELETE APPOINTMENT
export const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        await Appointment.findByIdAndDelete(id);
        res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// GET ALL APPOINTMENTS
export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        if (!appointments.length) {
            return res.status(404).json({ message: "No appointments found" });
        }
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// GET APPOINTMENT BY ID
export const getAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// UPDATE APPOINTMENT
export const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true });
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        res.status(200).json({ message: "Appointment updated successfully", appointment });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};



//--------------Normal User-------------//


// // SIGNUP
export const signup = async (req, res) => {
    try {
        const { firstName, lastName, email, contact, location, password, confirmPassword } = req.body;

        // Check if user already exists
        const existingUser = await UserSignup.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Check if passwords match
        // if (password !== confirmPassword) {
        //     return res.status(400).json({ message: "Passwords do not match" });
        // }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new UserSignup({
            firstName,
            lastName,
            email,
            contact,
            location,
            // password, // Store hashed password
            password: hashedPassword, // Store hashed password
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// SIGNIN
export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await UserSignup.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, "your_secret_key", { expiresIn: "1h" });

        res.status(200).json({ message: "Login successful, you are headign to home page, see URL", token });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// ✅ Get User Profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await UserSignup.findById(req.user.id).select("-password"); // Exclude password
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
        console.log(error.message);
        
    }
};

// ✅ Update User
export const updateUser = async (req, res) => {
    try {
        const { firstName, lastName, email, contact, location } = req.body;
        const updatedUser = await UserSignup.findByIdAndUpdate(
            req.params.id,
            { firstName, lastName, email, contact, location },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// ✅ Delete User
export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await UserSignup.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};



// In-memory token blacklist (for development) 
// logout
let tokenBlacklist = new Set();

export const logout = async (req, res) => {
    try {
        const token = req.header("Authorization")?.split(" ")[1];
        if (!token) return res.status(400).json({ message: "No token provided" });

        tokenBlacklist.add(token);
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};






// GET ALL SIGN UP USERS
export const GetAllSignupUsers = async (req, res) => {
    try {
        const findusers = await UserSignup.find();
        if (!findusers.length) {
            return res.status(404).json({ message: "No users found" });
        }
        res.status(200).json(findusers);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};