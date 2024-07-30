import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState(''); // Change 'name' to 'username'
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault(); // Prevent default form submission
 
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password }); // Change 'name' to 'username'
      console.log('API Response:', response.data); // Log response for debugging
      if (response.data.success) {
        // Store the username and token in local storage
        console.log(response.data)
        localStorage.setItem('username', response.data.username); // Change 'name' to 'username'
        localStorage.setItem('token', response.data.token); // Ensure 'token' is returned from the backend
 
        // Navigate to the dashboard
        navigate('/dashboard');
      } else {
        setError(response.data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Login Error:', error); // Log error for debugging
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-20">
      <div className="bg-white p-8 rounded shadow-md mx-52">
        <h1 className="text-2xl font-bold mb-6">Login to Eventure</h1>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="username" className="block mb-2 text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              name="username" // Change 'name' to 'username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2 text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
          {error && <div className="text-red-600">{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default Login;
