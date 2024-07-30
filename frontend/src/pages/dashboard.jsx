import React, { useEffect, useState } from 'react';
import Header from '../common/header';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Fetch username from local storage
    const storedUsername = localStorage.getItem('username');
    console.log('Retrieved username:', storedUsername); // Debugging
    setUsername(storedUsername || 'Guest');

    // Fetch upcoming events
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events');
        if (response.data.success) {
          const now = new Date();
          const upcomingEvents = response.data.events.filter(event => new Date(event.date) >= now);
          setEvents(upcomingEvents);
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
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl">Welcome, {username}</h1>
          <Link to="/createevent">
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              Create New Event
            </button>
          </Link>
        </div>
        <div className="bg-white p-4 mt-4 shadow-sm">
          <h2 className="text-xl mb-4">Upcoming Events</h2>
          {events.length > 0 ? (
            events.map((event, index) => (
              <p key={event.eventid}>
                Event {index + 1}: {event.title} - Date: {formatDate(event.date)}
              </p>
            ))
          ) : (
            <p>No upcoming events available</p>
          )}
        </div>
        <div className="bg-white p-4 mt-4 shadow-sm">
          <h2 className="text-xl mb-4">Your Tasks</h2>
          <div className="bg-gray-200 p-2 mb-2">Task 1: Prepare presentation for the conference</div>
          <div className="bg-gray-200 p-2 mb-2">Task 2: Coordinate with tech meetup speakers</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
