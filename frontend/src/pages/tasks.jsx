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
      <div className="container mx-auto p-4">
        <div className="text-center py-4">
          <h1 className="text-2xl">Task Details</h1>
        </div>
        {tasks.length > 0 ? (
          tasks.map(task => (
            <div key={task.taskid} className="bg-white p-4 mt-4 shadow-sm">
              <div className="mb-4">
                <label className="font-bold">Task Title:</label>
                <div className="ml-1">{task.title}</div>
              </div>
              <div className="mb-4">
                <label className="font-bold">Description:</label>
                <div className="ml-1">{task.description}</div>
              </div>
              <div className="mb-4">
                <label className="font-bold">Status:</label>
                <div className="ml-1">{task.status}</div>
              </div>
              <div className="flex space-x-4">
                <button onClick={() => handleEdit(task.taskid)} className="px-4 py-2 bg-blue-500 text-white rounded">Edit Task</button>
                <button onClick={() => handleDelete(task.taskid)} className="px-4 py-2 bg-red-500 text-white rounded">Delete Task</button>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white p-4 mt-4 shadow-sm">
            <p>No tasks available</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tasks;
