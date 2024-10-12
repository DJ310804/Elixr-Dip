import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
    } else {
      setError('');
      console.log('Login attempted with:', { email, password });
    }
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
              />
            </div>
            <div className="flex justify-between items-center mt-6">
              <button className="btn btn-primary">Login</button>
              <a href="#" className="link link-hover text-sm">Forgot password?</a>
            </div>
          </form>
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