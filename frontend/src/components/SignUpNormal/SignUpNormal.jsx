import React, { useState } from "react";
import "./SignUpNormal.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


const SignUpNormal = () => {
  const initialUserState = {
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    location: "",
    password: "",
    confirmPassword: "",
  };

  const [user, setUser] = useState(initialUserState);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const timeRegex = /^\d{1,2}:\d{2} [AP]M - \d{1,2}:\d{2} [AP]M$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validate = () => {
    let tempErrors = {};

    if (!user.firstName.trim()) tempErrors.firstName = "First name is required.";
    if (!user.lastName.trim()) tempErrors.lastName = "Last name is required.";
    if (!emailRegex.test(user.email)) tempErrors.email = "Enter a valid email address.";
    if (!user.contact.match(/^\d{13}$/)) tempErrors.contact = "Contact number must be exactly 13 digits.";
    if (!user.location.trim()) tempErrors.location = "Location is required.";
    if (!user.password.trim()) tempErrors.password = "Password is required.";
    if (user.password.length < 6) tempErrors.password = "Password must be at least 6 characters.";
    if (user.password !== user.confirmPassword) tempErrors.confirmPassword = "Passwords do not match.";
    

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setUser({ ...user, [name]: value });

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post("http://localhost:8000/api/signup", user);
      toast.success(response.data.message, { position: "top-right" });
      navigate("/signinnormal");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <h1>Registration Form As A Normal User</h1>
      <form onSubmit={submitForm}>
        <div className="row first-last">
          <div className="first input-group">
            <label>First Name:</label>
            <input type="text" name="firstName" value={user.firstName} onChange={inputHandler} required />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>
          <div className="last input-group">
            <label>Last Name:</label>
            <input type="text" name="lastName" value={user.lastName} onChange={inputHandler} required />
            {errors.lastName && <span className="error">{errors.lastName}</span>}
          </div>
        </div>

        <div className="row email-contact">
          <div className="email input-group">
            <label>Email:</label>
            <input type="email" name="email" value={user.email} onChange={inputHandler} required />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>
          <div className="contact input-group">
            <label>Contact No:</label>
            <input type="text" name="contact" value={user.contact} onChange={inputHandler} required />
            {errors.contact && <span className="error">{errors.contact}</span>}
          </div>
        </div>

        <div className="input-group">
          <label>Location:</label>
          <input type="text" name="location" value={user.location} onChange={inputHandler} required />
          {errors.location && <span className="error">{errors.location}</span>}
        </div>

        <div className="row password-confirmPass">
          <div className="input-group password">
            <label>Password:</label>
            <input type="password" name="password" value={user.password} onChange={inputHandler} required />
            {errors.password && <span className="error">{errors.password}</span>}
          </div>
          <div className="input-group confirmPass">
            <label>Confirm Password:</label>
            <input type="password" name="confirmPassword" value={user.confirmPassword} onChange={inputHandler} required />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>
          <div className="alreadyhaveaccount">
            <p>Already have an account ? <Link to="/signinnormal">Signin</Link></p>
          </div>
        </div>

        <div className="submitBtn">
          <button type="submit" className="submit-btn">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default SignUpNormal;