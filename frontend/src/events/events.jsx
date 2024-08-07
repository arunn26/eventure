import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Events() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events');
        if (response.data.success) {
          setEvents(response.data.events);
        } else {
          console.error('Failed to fetch events');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleEdit = (eventid) => {
    navigate(`/editevent/${eventid}`);
  };

  const handleDelete = async (eventid) => {
    try {
      const response = await axios.delete(`http://localhost:5000/events/${eventid}`);
      if (response.data.success) {
        setEvents(events.filter(event => event.eventid !== eventid));
      } else {
        console.error('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Get the date in a readable format
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="container mx-auto p-6">
        <div className="text-center py-6">
          <h1 className="text-3xl font-semibold text-gray-800">Event Details</h1>
        </div>
        {events.map(event => (
          <section key={event.eventid} className="bg-white p-6 mb-6 rounded-lg shadow-lg">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-700 mb-1">Event Name</h2>
              <p className="text-gray-900">{event.title}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-700 mb-1">Event Date</h2>
              <p className="text-gray-900">{formatDate(event.date)}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-700 mb-1">Location</h2>
              <p className="text-gray-900">{event.location}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-700 mb-1">Description</h2>
              <p className="text-gray-900">{event.description}</p>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => handleEdit(event.eventid)}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
              >
                Edit Event
              </button>
              <button 
                onClick={() => handleDelete(event.eventid)}
                className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition"
              >
                Delete Event
              </button>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default Events;
