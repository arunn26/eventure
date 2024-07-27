import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"

function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function check(e) {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await axios.post('http://localhost:5000/check', { user, pass });
      if (response.data.success) {
        // Store the username in local storage
        localStorage.setItem('username', response.data.username);
        
        // Navigate to the dashboard
        navigate('/dashboard');
      } else {
        setError('Invalid username or password');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-20">
    <div className="bg-white p-8 rounded shadow-md mx-52">
      <h1 className="text-2xl font-bold mb-6">Login to Eventure</h1>

      <form onSubmit={check}>
        <div className="mb-4">
          <label htmlFor="username" className="block mb-2">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block mb-2">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login</button>
        </div>
        {error && <div className="text-red-600">{error}</div>}
      </form>
    </div>
  </div>
);
}

export default Login;
