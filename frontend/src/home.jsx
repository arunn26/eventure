import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="container mx-auto p-6 max-w-md bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">Welcome to Eventure</h1>
        <p className="text-center text-gray-600 mb-8">
          Your one-stop solution for managing and organizing events effortlessly. 
          Sign up or log in to get started!
        </p>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-blue-600 mb-2">Signup</h2>
            <p className="text-gray-700 mb-4">Create an account to start managing your events. It's quick and easy!</p>
            <Link to="/signup">
              <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
                Signup
              </button>
            </Link>
          </div>
          <div className="bg-green-50 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-green-600 mb-2">Login</h2>
            <p className="text-gray-700 mb-4">Already have an account? Log in to access your events and more.</p>
            <Link to="/login">
              <button className="w-full py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
