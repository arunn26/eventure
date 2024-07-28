const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userid: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  task_ids: [{ type: Number, ref: 'Task' }],  // Array of task IDs
  participating_event_ids: [{ type: Number, ref: 'Event' }]  // Array of event IDs
});

const User = mongoose.model('User', userSchema);

module.exports = User;







// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// const User = mongoose.model('User', userSchema);

// module.exports = User;
