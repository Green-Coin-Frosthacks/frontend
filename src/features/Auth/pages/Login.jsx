import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormGroup from "../components/FormGroup";
import "../style/auth.styles.scss";
import Brand from "../components/Brand";
import useAuth from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { handleLogin , loading } = useAuth();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
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
    handleLogin(formData.identifier, formData.password);
    navigate("/");
  };

  return (
    <main>
      <Brand />
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          
          {/* Email / Roll Number */}
          <FormGroup  label="Roll Number or Email" id="identifier" name="identifier" type="text" placeholder="Enter roll number or email" value={formData.identifier} onChange={handleChange} autoComplete="username"/>

          {/* Password */}
          <FormGroup label="Password" id="password" name="password" type="password" placeholder="Enter password" value={formData.password} onChange={handleChange} autoComplete="current-password"/>

          <button disabled={loading} type="submit" className="btn btn--primary button-primary">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p>
          Don't have an account?
          <Link to="/register" className="text-link">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;