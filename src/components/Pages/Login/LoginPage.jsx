import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google"; // Import Google Login
import "./LoginPage.css";
import assets from "../../../assets/assets";

const LoginPage = ({ setUser }) => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate(); // Hook for navigation

  const onSubmitHandler = (event) => {
    event.preventDefault();

    // Simulate account creation or login process
    if (currentState === "Sign Up") {
      const newUser = {
        name: userName,
        email,
      };
      setUser(newUser); // Update the user state in App.jsx
      navigate("/dashboard"); // Redirect to the dashboard
    } else if (currentState === "Login") {
      const existingUser = {
        name: "Existing User", // Replace with actual user logic
        email,
      };
      setUser(existingUser); // Update the user state
      navigate("/dashboard"); // Redirect to the dashboard
    }
  };

  // Google Login Success Handler
  const handleGoogleLoginSuccess = async (credentialResponse) => {
    console.log("Google Login Success", credentialResponse);

    // Decode the token and extract user information
    const decodedToken = JSON.parse(atob(credentialResponse.credential.split(".")[1]));
    const { name, email, picture } = decodedToken;

    // Set the user data from the decoded token
    setUser({
      name: name || "Google User",
      email: email || "user@example.com",
      picture: picture || "https://www.example.com/default-picture.png", // Set a default picture if not available
    });

    navigate("/dashboard"); // Redirect to the dashboard
  };

  const handleGoogleLoginFailure = () => {
    console.log("Google Login Failed");
  };

  return (
    <div className="login">
      <div>
        <img className="logo" src={assets.logo_big} alt="Logo" />
        <h1>Customer Feedback Platform</h1>
      </div>
      <form onSubmit={onSubmitHandler} className="login-form">
        <h2>{currentState}</h2>
        {currentState === "Sign Up" && (
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            type="text"
            placeholder="Username"
            className="form-input"
            required
          />
        )}
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Email address"
          className="form-input"
          required
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Password"
          className="form-input"
          required
        />
        <button type="Submit">
          {currentState === "Sign Up" ? "Create Account" : "Login now"}
        </button>

        {/* Google Login Button */}
        {currentState === "Sign Up" && (
          <div className="google-login">
            <h3>Or Sign Up with Google</h3>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginFailure}
            />
          </div>
        )}

        <div className="login-term">
          <input type="checkbox" required />
          <p>Agree to the terms and conditions of use & privacy policy</p>
        </div>

        <div className="login-switch">
          {currentState === "Sign Up" ? (
            <p className="login-toggle">
              Already have an account{" "}
              <span onClick={() => setCurrentState("Login")}>Login here</span>
            </p>
          ) : (
            <p className="login-toggle">
              Create an account{" "}
              <span onClick={() => setCurrentState("Sign Up")}>click here</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
