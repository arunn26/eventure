import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/signup', { username, password });
      if (response.data.message === "User created successfully") {
        navigate('/login');
      } else {
        setError(response.data.message || 'Signup failed.');
      }
    } catch (error) {
      console.error('There was an error!', error.response ? error.response.data : error.message);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="text-center py-4">
        <h1 className="text-2xl">Signup</h1>
      </div>
      <div className="bg-white p-4 mt-4 shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Signup</button>
          </div>
          {error && <div className="text-red-600">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Signup;
