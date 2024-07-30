import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import axios from 'axios';

function Profile() {
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events');
        if (response.data.success) {
          const now = new Date();
          const pastEventsList = response.data.events.filter(event => new Date(event.date) < now);
          setPastEvents(pastEventsList);
        } else {
          console.error('Failed to fetch events');
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
          <form>
            <div className="mb-4">
              <label htmlFor="currentPassword" className="block mb-2">Current Password</label>
              <input type="password" id="currentPassword" name="currentPassword" className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="newPassword" className="block mb-2">New Password</label>
              <input type="password" id="newPassword" name="newPassword" className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block mb-2">Confirm New Password</label>
              <input type="password" id="confirmPassword" name="confirmPassword" className="w-full p-2 border border-gray-300 rounded" />
            </div>
            <div className="mb-4">
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Change Password</button>
            </div>
          </form>
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
