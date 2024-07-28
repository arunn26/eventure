import React, { useEffect, useState } from 'react';
import Header from '../common/header';
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
    return date.toISOString().split('T')[0]; // Get the date part only in yyyy-MM-dd format
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-4">
        <div className="text-center py-4">
          <h1 className="text-2xl">Event Details</h1>
        </div>
        {events.map(event => (
          <div key={event.eventid} className="bg-white p-4 mt-4 shadow-sm">
            <div className="mb-4">
              <label className="font-bold">Event Name:</label>
              <div className="ml-1">{event.title}</div>
            </div>
            <div className="mb-4">
              <label className="font-bold">Event Date:</label>
              <div className="ml-1">{formatDate(event.date)}</div>
            </div>
            <div className="mb-4">
              <label className="font-bold">Location:</label>
              <div className="ml-1">{event.location}</div>
            </div>
            <div className="mb-4">
              <label className="font-bold">Description:</label>
              <div className="ml-1">{event.description}</div>
            </div>
            <div className="flex space-x-4">
              <button onClick={() => handleEdit(event.eventid)} className="px-4 py-2 bg-blue-500 text-white rounded">Edit Event</button>
              <button onClick={() => handleDelete(event.eventid)} className="px-4 py-2 bg-red-500 text-white rounded">Delete Event</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
