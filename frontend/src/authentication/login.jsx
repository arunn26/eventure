import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/auth/login', { username, password });
      console.log('Login Response:', response.data);  // Debugging line
      if (response.data.success) {
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('userId', response.data.userId);  // Save userId
        navigate('/dashboard');
      } else {
        setError(response.data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Login Error:', error);  // Debugging line
      setError('An error occurred. Please try again.');
    }
  }
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Login to Eventure</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
          {error && <div className="text-red-600 text-center mt-4">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Login;
