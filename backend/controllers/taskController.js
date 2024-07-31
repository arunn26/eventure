const Task = require('../models/task');
const User = require('../models/user');
const { getNextTaskId } = require('../utils/idUtils');

const createTask = async (req, res) => {
  try {
    const { title, description, deadline, eventid, assigneeid } = req.body;

    if (!title || !description || !deadline || !eventid || !assigneeid) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // Get the next task ID
    const taskid = await getNextTaskId();
    const newTask = new Task({ taskid, title, description, deadline, eventid, assigneeid });
    await newTask.save();

    // Update the user with the new task ID
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

module.exports = { createTask, getTasksByUser };
