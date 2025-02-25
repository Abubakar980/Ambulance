import React, { useState } from "react";
import "./LoginNormal.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const LoginNormal = () => {
  const [user, setUser] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validate = () => {
    let tempErrors = {};
    if (!user.email.trim()) tempErrors.email = "Email is required.";
    else if (!emailRegex.test(user.email)) tempErrors.email = "Enter a valid email address.";
    
    if (!user.password.trim()) tempErrors.password = "Password is required.";
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
    if (!validate()) return;
    
    try {
      const response = await axios.post("http://localhost:8000/api/signin", user);
      const { token } = response.data;

      if (token) {
        localStorage.setItem("token", token);  // Store token
        localStorage.setItem("email", user.email); // Store email
      }

      toast.success(response.data.message, { position: "top-right" });
      navigate("/homeafterreg");
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed.", { position: "top-right" });
    }
  };

  return (
    <div className="form-container">
      <Link to="/signupnormal">Back to signup</Link>
      <h2>Login</h2>
      <form onSubmit={submitForm}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={inputHandler}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={inputHandler}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        
        <div className="submit-btn-container">
          <button type="submit" className="submit-btn">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginNormal;
