const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventid: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  location: { type: String, required: true }
  // userid: { type: Number, ref: 'User', required: true },  // Reference to User collection
  // task_ids: [{ type: Number, ref: 'Task' }],  // Array of task IDs
  // participant_ids: [{ type: Number, ref: 'Participant' }]  // Array of participant IDs
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
