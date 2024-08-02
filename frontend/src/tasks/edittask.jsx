import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditTask() {
  const { taskid } = useParams(); // Retrieve taskid from URL parameters
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tasks/${taskid}`);
        if (response.data.success) {
          setTask(response.data.task);
          setTitle(response.data.task.title);
          setDescription(response.data.task.description);
        } else {
          console.error('Failed to fetch task');
        }
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    if (taskid) {
      fetchTask();
    }
  }, [taskid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/tasks/${taskid}`, {
        title,
        description,
      });
      if (response.data.success) {
        navigate('/tasks');
      } else {
        console.error('Failed to update task');
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl">Edit Task</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="font-bold">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="ml-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="font-bold">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="ml-1 p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Update Task
        </button>
      </form>
    </div>
  );
}

export default EditTask;
