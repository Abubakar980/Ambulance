import mongoose from "mongoose";

// UserDriver Schema
const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    contact: { type: String, required: true, match: /^\d{13}$/ },
    location: { type: String, required: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    confirmPassword: { type: String, required: true, minlength: 6 },
    pricingPerRoute: { type: Number, required: true },
    availTime: { type: String, required: true }
}, { timestamps: true });

const UserDriver = mongoose.model("UserDriver", userSchema);

// Appointment Schema
const appointmentSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
    contact: { type: String, required: true, match: /^\d{13}$/ },
    price: { type: Number, required: true },
    urgency: { type: String, enum: ["Normal", "Urgent"], default: "Normal" },
    location: { type: String, required: true, trim: true },
}, { timestamps: true });

const Appointment = mongoose.model("Appointment", appointmentSchema);

// Login Schema
const loginSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
    password: { type: String, required: true, minlength: 6 },
}, { timestamps: true });

const UserLogin = mongoose.model("UserLogin", loginSchema);

// Signup Schema
const signUpSchema = new mongoose.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ },
    contact: { type: String, required: true, match: /^\d{13}$/ },
    location: { type: String, required: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
}, { timestamps: true });

const UserSignup = mongoose.model("UserSignup", signUpSchema);

export { UserDriver, Appointment, UserLogin, UserSignup };
