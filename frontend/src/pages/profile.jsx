import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import axios from 'axios';

function Profile() {
  const [pastEvents, setPastEvents] = useState([]);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setMessage('User ID not found. Please log in again.');
    }
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }
  
    if (!userId) {
      setMessage('User ID is not available');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/auth/changepassword', {
        userId,
        currentPassword,
        newPassword,
      });
      if (response.data.message === 'Password changed successfully') {
        setMessage('Password changed successfully');
      } else {
        setMessage(response.data.message || 'Failed to change password');
      }
    } catch (error) {
      setMessage('Error changing password');
    }
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events');
        if (response.data.success) {
          const now = new Date();
          const pastEventsList = response.data.events.filter(event => new Date(event.date) < now);
          setPastEvents(pastEventsList);
        } else {
          console.error('Failed to fetch events:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Improved date formatting
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <main className="p-6 lg:p-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-10">Profile Management</h1>

        <section className="bg-white p-6 rounded-lg shadow-lg mb-10 max-w-3xl">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Change Password</h2>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-600 mb-2">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600 mb-2">New Password</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600 mb-2">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 transition"
              disabled={!userId}
            >
              Change Password
            </button>
          </form>
          {message && <p className="text-red-500 mt-4 text-center">{message}</p>}
        </section>

        <section className="bg-white p-6 rounded-lg shadow-lg max-w-3xl">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Past Events and Activities</h2>
          {pastEvents.length > 0 ? (
            <ul className="list-disc pl-5 space-y-2">
              {pastEvents.map((event) => (
                <li key={event.eventid} className="text-gray-800">
                  <span className="font-semibold">{event.title}</span> - Date: {formatDate(event.date)}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No past events available</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default Profile;
