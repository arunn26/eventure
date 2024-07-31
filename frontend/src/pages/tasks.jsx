import React, { useState, useEffect } from 'react';
import Header from '../components/header';
import axios from 'axios';

const Tasks = () => {
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('');
  const [selectedEvent, setSelectedEvent] = useState('');
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/events');
        setEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchEvents();
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/tasks', {
        title: taskTitle,
        description: taskDescription,
        deadline: taskDeadline,
        eventid: selectedEvent,
        assigneeid: selectedAssignee,
        status: taskStatus,
      });
      alert('Task created successfully');
      // Clear form fields
      setTaskTitle('');
      setTaskDescription('');
      setTaskDeadline('');
      setSelectedEvent('');
      setSelectedAssignee('');
      setTaskStatus('');
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Error creating task');
    }
  };

  return (
    <div><Header />
    <div className="container mx-auto p-4">
      
      <h1 className="text-2xl font-bold mb-4">Create New Task</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
      <div>
          <label htmlFor="event" className="block text-sm font-medium text-gray-700">Related Event</label>
          <select
            id="event"
            value={selectedEvent}
            onChange={(e) => setSelectedEvent(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select an Event</option>
            {events.map((event) => (
              <option key={event.eventid} value={event.eventid}>
                {event.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input
            id="title"
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <input
            id="description"
            type="text"
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline</label>
          <input
            id="deadline"
            type="date"
            value={taskDeadline}
            onChange={(e) => setTaskDeadline(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
 
        <div>
          <label htmlFor="assignee" className="block text-sm font-medium text-gray-700">Assignee</label>
          <select
            id="assignee"
            value={selectedAssignee}
            onChange={(e) => setSelectedAssignee(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="">Select an Assignee</option>
            {users.map((user) => (
              <option key={user.userid} value={user.userid}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Create Task
        </button>
      </form>
    </div>
    </div>
  );
};

export default Tasks;
