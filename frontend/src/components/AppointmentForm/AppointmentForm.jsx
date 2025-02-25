import React, { useState } from "react";
import "./AppointmentForm.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AppointmentForm = () => {
  const initialUserState = {
    name: "",
    email: "",
    contact: "",
    price: "",
    urgency: "Normal",
    location: "",
  };

  const [user, setUser] = useState(initialUserState);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    let tempErrors = {};

    if (!user.name.trim()) tempErrors.name = "Name is required.";
    if (!user.email.includes("@")) tempErrors.email = "Enter a valid email address.";
    if (!user.contact.match(/^\d{13}$/)) tempErrors.contact = "Contact number must be exactly 13 digits.";
    if (!user.price.trim()) tempErrors.price = "Price is required.";
    if (!user.location.trim()) tempErrors.location = "Location is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    console.log("Submit button clicked!");

    if (!validate()) return;
    console.log("Validation failed!", errors);
    
    try {
      console.log("Sending data to Backend", user);
      await axios
      .post("http://localhost:8000/api/createAppointment", user)
      .then((response) => {
        toast.success(response.data.message, { position: "top-right" });
        console.log("User created successfully!");
        navigate("/getallappointments");
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="form-container">
      <div className="inputGroup">
        <Link to="/" className="button_submit">
          <i className="fa-solid fa-backward"></i> Back
        </Link>
      </div>
      <h1>Appointment Form</h1>
      <form onSubmit={submitForm}>
        <div className="input-group">
          <label>Name:</label>
          <input type="text" name="name" value={user.name} onChange={inputHandler} required />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div className="input-group">
          <label>Email:</label>
          <input type="email" name="email" value={user.email} onChange={inputHandler} required />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="input-group">
          <label>Contact No:</label>
          <input type="text" name="contact" value={user.contact} onChange={inputHandler} required />
          {errors.contact && <span className="error">{errors.contact}</span>}
        </div>

        <div className="input-group">
          <label>Price Suggested:</label>
          <input type="text" name="price" value={user.price} onChange={inputHandler} required />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>

        <div className="input-group">
          <label>Urgency:</label>
          <select name="urgency" value={user.urgency} onChange={inputHandler}>
            <option value="Normal">Normal</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>

        <div className="input-group">
          <label>Location:</label>
          <input type="text" name="location" value={user.location} onChange={inputHandler} required />
          {errors.location && <span className="error">{errors.location}</span>}
        </div>

        <div className="submitBtn">
          <button type="submit" className="submit-btn">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
