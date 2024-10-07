// File: backend/controllers/taskController.js
const Task = require('../models/task');
const User = require('../models/user');
const { getNextTaskId } = require('../utils/idUtils');

const createTask = async (req, res) => {
  try {
    const { title, description, deadline, eventid, assigneeid } = req.body;

    if (!title || !description || !deadline || !eventid || !assigneeid) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const taskid = await getNextTaskId();
    const newTask = new Task({ taskid, title, description, deadline, eventid, assigneeid });
    await newTask.save();

    await User.findOneAndUpdate(
      { userid: assigneeid },
      { $push: { task_ids: taskid } }
    );

    res.status(201).json({ success: true, message: 'Task created successfully', task: newTask });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ success: false, message: 'Error creating task', error });
  }
};

const getTasksByUser = async (req, res) => {
  try {
    const userId = req.params.userid;
    const tasks = await Task.find({ assigneeid: userId });
    res.json({ success: true, tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json({ success: true, tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ message: 'Error fetching tasks', error });
  }
};

const getSingleTask = async (req, res) => {
  try {
    const task = await Task.findOne({ taskid: req.params.id });
    if (task) {
      res.json({ success: true, task });
    } else {
      res.status(404).json({ success: false, message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task', error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const updatedTask = await Task.findOneAndUpdate(
      { taskid: req.params.id },
      { title, description, status },
      { new: true }
    );
    if (updatedTask) {
      res.json({ success: true, message: 'Task updated successfully', task: updatedTask });
    } else {
      res.status(404).json({ success: false, message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating task', error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ taskid: req.params.id });
    if (deletedTask) {
      res.json({ success: true, message: 'Task deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task', error });
  }
};

module.exports = { createTask, getTasksByUser, getAllTasks, getSingleTask, updateTask, deleteTask };
