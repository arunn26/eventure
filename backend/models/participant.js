const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  participantid: { type: Number, required: true, unique: true },
  userid: { type: Number, ref: 'User', required: true },  // Reference to User collection
  eventid: { type: Number, ref: 'Event', required: true },  // Reference to Event collection
  role: { type: String, required: true }
});

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;
