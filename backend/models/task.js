const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  taskid: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  eventid: { type: Number, ref: 'Event', required: true },
  assigneeid: { type: Number, ref: 'User', required: true }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
