import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios";
import { AlertCircle } from "lucide-react";
import { useAuthContext } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Initialize navigate
  const { setIsLoggedIn, setLoginStatus } = useAuthContext(); // Access AuthContext

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = { email, password };

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/user/login/", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        const { token, msg } = response.data;
        console.log("Message:", msg);
        console.log("Tokens:", token);

        // Store tokens securely
        sessionStorage.setItem("accessToken", token.access);
        document.cookie = `refreshToken=${token.refresh}; HttpOnly; Secure; Path=/;`;

        // Update authentication state
        setIsLoggedIn(true);
        setLoginStatus("Logout");

        // Redirect to the home page
        navigate("/");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.detail || "Login failed. Please check your credentials.";
      console.error("Error during login:", errorMsg);
      setError(errorMsg); // Display error message
    }
  };

  // Function to navigate to the registration page
  const handleRegisterRedirect = () => {
    navigate("/register");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-2xl font-bold mb-4">Login to your account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                id="email"
                className="input input-bordered w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control mt-4">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="input input-bordered w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex justify-between items-center mt-6">
              <button className="btn btn-primary" type="submit">
                Login
              </button>
              <Link to="#" className="link link-hover text-sm">
                Forgot password?
              </Link>
            </div>
          </form>

          {/* Redirect to register page */}
          <div className="mt-4 text-center">
            <span className="text-sm">Don't have an account?</span>
            <button 
              onClick={handleRegisterRedirect} 
              className="link link-hover text-sm text-blue-500 ml-1"
            >
              Register here
            </button>
          </div>

          {error && (
            <div className="alert alert-error mt-4">
              <AlertCircle className="h-6 w-6" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
