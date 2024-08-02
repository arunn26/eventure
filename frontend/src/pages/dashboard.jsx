import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [username, setUsername] = useState('');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
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

    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tasks');
        if (response.data.success) {
          setTasks(response.data.tasks);
        } else {
          console.error('Failed to fetch tasks');
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || 'Guest');

    fetchEvents();
    fetchTasks();
  }, []);

  return (
    <div>
      <Header />
      <main className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold">Welcome, {username}</h1>
          <div className="flex space-x-4">
            <Link to="/createevent">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition">
                Create New Event
              </button>
            </Link>
            <Link to="/createtask">
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition">
                Create Task
              </button>
            </Link>
          </div>
        </div>
        <section className="bg-white p-6 mb-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
          {events.length > 0 ? (
            events.map((event, index) => (
              <div key={event.eventid} className="border-b border-gray-300 py-2 last:border-b-0">
                <p className="text-lg font-medium">
                  Event {index + 1}: <span className="text-gray-500">{event.title}</span> - Date: <span className="text-gray-500">{new Date(event.date).toISOString().split('T')[0]}</span>
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No upcoming events available</p>
          )}
        </section>
        <section className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Your Tasks</h2>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <div key={task.taskid} className="bg-gray-100 p-4 mb-4 rounded-lg shadow-sm border border-gray-200">
                <p className="text-lg font-medium">
                  Task {index + 1}: <span className="text-gray-700">{task.title}</span>
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No tasks available</p>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
