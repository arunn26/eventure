import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import axios from 'axios';

function Profile() {
  const [pastEvents, setPastEvents] = useState([]);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(null); // Add state for userId

  useEffect(() => {
    // Retrieve userId from local storage
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
      const response = await axios.post('http://localhost:5000/changepassword', {
        userId,          // Pass userId to the backend
        currentPassword,
        newPassword,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error changing password:', error);
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
    return date.toISOString().split('T')[0]; // Get the date part only in yyyy-MM-dd format
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <div className="text-center py-4">
          <h1 className="text-2xl">Profile Management</h1>
        </div>

        <div className="bg-white p-4 mt-4 shadow-sm">
          <h2 className="text-xl mb-4">Change Password</h2>
          <form onSubmit={handlePasswordChange}>
            <div className="mb-4">
              <label htmlFor="currentPassword" className="block mb-2">Current Password</label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block mb-2">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block mb-2">Confirm New Password</label>
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
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded"
                disabled={!userId} // Disable button if userId is not available
              >
                Change Password
              </button>
            </div>
          </form>
          {message && <p className="text-red-500">{message}</p>}
        </div>

        <div className="bg-white p-4 mt-4 shadow-sm">
          <h2 className="text-xl mb-4">Past Events and Activities</h2>
          {pastEvents.length > 0 ? (
            <ul className="list-disc pl-5">
              {pastEvents.map((event, index) => (
                <li key={event.eventid}>
                  Event {index + 1}: {event.title} - Date: {formatDate(event.date)}
                </li>
              ))}
            </ul>
          ) : (
            <p>No past events available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
