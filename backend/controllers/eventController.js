const Event = require("../models/event");
const { getNextEventId } = require("../utils/idUtils");


const createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    if (!title || !description || !date || !location) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled' });
    }

    const eventid = await getNextEventId();
    const newEvent = new Event({ eventid, title, description, date, location });
    await newEvent.save();
    res.status(201).json({ success: true, message: 'Event created successfully' });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ success: false, message: 'Error creating event', error });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json({ success: true, events });
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
};

const getSingleEvent = async (req, res) => {
  try {
    const event = await Event.findOne({ eventid: req.params.id });
    if (event) {
      res.json({ success: true, event });
    } else {
      res.status(404).json({ success: false, message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching event", error });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const updatedEvent = await Event.findOneAndUpdate(
      { eventid: req.params.id },
      { title, description, date, location },
      { new: true }
    );
    if (updatedEvent) {
      res.json({ success: true, message: "Event updated successfully", event: updatedEvent });
    } else {
      res.status(404).json({ success: false, message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating event", error });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const deletedEvent = await Event.findOneAndDelete({ eventid: req.params.id });
    if (deletedEvent) {
      res.json({ success: true, message: "Event deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting event", error });
  }
};

module.exports = { createEvent, getAllEvents, getSingleEvent, updateEvent, deleteEvent };
