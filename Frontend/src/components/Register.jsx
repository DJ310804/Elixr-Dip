import React, { useState } from 'react';
import LoginPage from './login/Login';
import { Mail, Lock, User, Accessibility } from 'lucide-react';
import { Link } from 'react-router-dom';

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    hasAccessibilityNeeds: false,
    accessibilityNeeds: [],
    otherAccessibilityNeed: '',
    agreeTerms: false,
  });

  const accessibilityOptions = [
    { value: 'deaf', label: 'Deaf or Hard of Hearing' },
    // { value: 'visual', label: 'Visual Impairment' },
    // { value: 'mobility', label: 'Mobility Impairment' },
    // { value: 'cognitive', label: 'Cognitive Disability' },
    { value: 'speech', label: 'Speech Impairment' },
    { value: 'other', label: 'Other' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'accessibilityNeeds') {
      const updatedNeeds = checked 
        ? [...formData.accessibilityNeeds, value]
        : formData.accessibilityNeeds.filter(need => need !== value);
      
      setFormData(prevState => ({
        ...prevState,
        accessibilityNeeds: updatedNeeds
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sign-up form submitted:', formData);
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
                <span><User size={18} /></span>
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
                <span><Mail size={18} /></span>
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
                <span><Lock size={18} /></span>
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
                <span><Lock size={18} /></span>
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
                  name="hasAccessibilityNeeds"
                  checked={formData.hasAccessibilityNeeds}
                  onChange={handleChange}
                  className="checkbox checkbox-primary mr-2"
                />
                <span className="label-text flex items-center">
                  <Accessibility size={18} className="mr-2" />
                  I have accessibility needs
                </span>
              </label>
            </div>

            {formData.hasAccessibilityNeeds && (
              <div className="form-control mt-4 p-4 bg-base-200 rounded-lg">
                <label className="label">
                  <span className="label-text font-medium">Please select all that apply:</span>
                </label>
                <div className="space-y-2">
                  {accessibilityOptions.map((option) => (
                    <label key={option.value} className="label cursor-pointer justify-start">
                      <input
                        type="checkbox"
                        name="accessibilityNeeds"
                        value={option.value}
                        checked={formData.accessibilityNeeds.includes(option.value)}
                        onChange={handleChange}
                        className="checkbox checkbox-primary mr-2"
                      />
                      <span className="label-text">{option.label}</span>
                    </label>
                  ))}
                </div>
                
                {formData.accessibilityNeeds.includes('other') && (
                  <div className="mt-2">
                    <input
                      type="text"
                      name="otherAccessibilityNeed"
                      value={formData.otherAccessibilityNeed}
                      onChange={handleChange}
                      placeholder="Please specify your accessibility needs"
                      className="input input-bordered w-full"
                    />
                  </div>
                )}
              </div>
            )}

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
};

export default RegistrationPage;