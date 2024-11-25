import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import axios from 'axios';

function RegistrationPage() {
  const navigate = useNavigate(); // Initialize useNavigate
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form data before sending the request
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const data = {
      name: formData.username,
      email: formData.email,
      password: formData.password,
      password2: formData.confirmPassword,
      tc: formData.agreeTerms.toString(), // Convert boolean to string
    };

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/user/register/', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.data) {
        const { msg } = response.data;
        console.log('Message:', msg);

        // Navigate to the login page on successful registration
        navigate('/login');
      }
    } catch (error) {
      console.error('Error during registration:', error.response?.data || error.message);
      alert('Registration failed, please check your details.');
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl font-bold text-center mb-6">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <div className="input-group">
                <span>
                  <User size={18} />
                </span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <div className="input-group">
                <span>
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div className="input-group">
                <span>
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <div className="input-group">
                <span>
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>
            <div className="form-control mt-6">
              <label className="label cursor-pointer justify-start">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="checkbox checkbox-primary mr-2"
                />
                <span className="label-text">I agree to the Terms and Conditions</span>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary" disabled={!formData.agreeTerms}>
                Sign Up
              </button>
            </div>
          </form>
          <div className="divider">OR</div>
          <div className="text-center">
            <p>Already have an account?</p>
            <Link to="/login" className="link link-primary">
              Log in here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
