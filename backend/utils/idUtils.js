const Event = require('../models/event');
const User = require('../models/user');

// Utility function to get the next event ID
const getNextEventId = async () => {
  const lastEvent = await Event.findOne().sort({ eventid: -1 });
  return lastEvent ? lastEvent.eventid + 1 : 1;
};

// Utility function to get the next user ID
const getNextUserId = async () => {
  try {
    const lastUser = await User.findOne().sort({ userid: -1 });
    return lastUser ? lastUser.userid + 1 : 1;
  } catch (error) {
    console.error('Error getting next user ID:', error);
    throw new Error('Could not get the next user ID');
  }
};

module.exports = { getNextEventId, getNextUserId };
