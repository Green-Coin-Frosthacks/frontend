import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormGroup from "../components/FormGroup";
import "../style/auth.styles.scss";
import Brand from "../components/Brand";
import useAuth from "../hooks/useAuth";


function Register() {
  const navigate = useNavigate();
  const { loading , handleRegister } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rollNo: "",
  });

  const handleChange = (e) =>{
    const { name,value } = e.target;
    setFormData(prev=>{
        return {
            ...prev,
            [name]: value,
        }
    })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    handleRegister(formData.name, formData.email, formData.password, formData.rollNo);
    navigate("/");
  };

  return (
    <main>
      <Brand />
      <div className="form-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          
          {/* Name */}
          <FormGroup label="Name" id="name" name="name" type="text" placeholder="Enter name" value={formData.name} onChange={handleChange} autoComplete="username"/>


          {/* Email */}
          <FormGroup label="Email" id="email" name="email" type="email" placeholder="Enter email" value={formData.email} onChange={handleChange} autoComplete="email"/>
          
          {/* Roll Number */}
          <FormGroup label="Roll Number" id="rollNo" name="rollNo" type="text" placeholder="Enter roll number" value={formData.rollNo} onChange={handleChange} autoComplete="off"/>

          {/* Password */}
          <FormGroup label="Password" id="password" name="password" type="password" placeholder="Enter password" value={formData.password} onChange={handleChange} autoComplete="new-password"/>

          <button disabled={loading} type="submit" className="btn btn--primary button-primary">
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p>
          Alredy have an account?
          <Link to="/login" className="text-link">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;