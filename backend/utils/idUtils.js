const mongoose = require('mongoose');
const Task = require('../models/task');
const Event = require('../models/event'); // Add this line
const User = require('../models/user'); // Import the User model

// Utility function to get the next task ID
const getNextTaskId = async () => {
  try {
    const lastTask = await Task.findOne().sort({ taskid: -1 });
    return lastTask ? lastTask.taskid + 1 : 1;
  } catch (error) {
    console.error('Error getting next task ID:', error);
    throw new Error('Could not get the next task ID');
  }
};

// Existing utility functions
const getNextEventId = async () => {
  const lastEvent = await Event.findOne().sort({ eventid: -1 });
  return lastEvent ? lastEvent.eventid + 1 : 1;
};

const getNextUserId = async () => {
  try {
    const lastUser = await User.findOne().sort({ userid: -1 });
    return lastUser ? lastUser.userid + 1 : 1;
  } catch (error) {
    console.error('Error getting next user ID:', error);
    throw new Error('Could not get the next user ID');
  }
};




module.exports = { getNextTaskId, getNextEventId, getNextUserId };
