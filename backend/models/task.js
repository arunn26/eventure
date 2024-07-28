const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskid: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  deadline: { type: Date, required: true },
  eventid: { type: Number, ref: 'Event', required: true },  // Reference to Event collection
  assigneeid: { type: Number, ref: 'User', required: true }  // Reference to User collection
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
