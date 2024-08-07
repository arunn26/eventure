import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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

    fetchTasks();
  }, []);

  const handleEdit = (taskid) => {
    navigate(`/edittask/${taskid}`);
  };

  const handleDelete = async (taskid) => {
    try {
      const response = await axios.delete(`http://localhost:5000/tasks/${taskid}`);
      if (response.data.success) {
        setTasks(tasks.filter(task => task.taskid !== taskid));
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto p-6">
        <div className="text-center py-4">
          <h1 className="text-3xl font-semibold">Task Details</h1>
        </div>
        {tasks.length > 0 ? (
          tasks.map(task => (
            <div key={task.taskid} className="bg-white p-6 mt-4 rounded-lg shadow-lg">
              <div className="mb-4">
                <label className="font-semibold text-gray-700">Task Title:</label>
                <div className="text-gray-900">{task.title}</div>
              </div>
              <div className="mb-4">
                <label className="font-semibold text-gray-700">Description:</label>
                <div className="text-gray-900">{task.description}</div>
              </div>
              <div className="mb-4">
                <label className="font-semibold text-gray-700">Status:</label>
                <div className="text-gray-900">{task.status}</div>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => handleEdit(task.taskid)}
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Edit Task
                </button>
                <button
                  onClick={() => handleDelete(task.taskid)}
                  className="px-4 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete Task
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-6 mt-4 rounded-lg shadow-lg">
            <p>No tasks available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tasks;
