const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./models/user");
const Event = require("./models/event");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Utility function to get the next event ID
const getNextEventId = async () => {
  const lastEvent = await Event.findOne().sort({ eventid: -1 });
  return lastEvent ? lastEvent.eventid + 1 : 1;
};

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { name, password } = req.body;
    const existingUser = await User.findOne({ name });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new User({ userid: Date.now(), name, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;

    const foundUser = await User.findOne({ name });

    if (foundUser) {
      if (foundUser.password === password) {
        res.json({ success: true, name: foundUser.name });
      } else {
        res.json({ success: false, message: "Incorrect password" });
      }
    } else {
      res.json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: "Error checking user", error });
  }
});

// User Data Route
app.get("/userdata", async (req, res) => {
  try {
    const { name } = req.query;
    
    if (!name) {
      return res.status(400).json({ success: false, message: "Name query parameter is required" });
    }

    const user = await User.findOne({ name });
    
    if (user) {
      res.json({ success: true, user });
    } else {
      res.json({ success: false, message: "User not found" });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: "Error fetching user data", error });
  }
});

// Create Event Route
app.post('/events', async (req, res) => {
  try {
    const { title, description, date, location } = req.body;

    console.log('Received event data:', req.body);

    if (!title || !description || !date || !location) {
      console.error('Validation failed: Missing required fields');
      return res.status(400).json({ success: false, message: 'All required fields must be filled' });
    }

    const eventid = await getNextEventId(); // Get the next event ID

    const newEvent = new Event({ eventid, title, description, date, location });

    console.log('New event data:', newEvent);

    await newEvent.save();
    console.log('Event created successfully');
    res.status(201).json({ success: true, message: 'Event created successfully' });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ success: false, message: 'Error creating event', error: error.message });
  }
});

// Get All Events Route
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json({ success: true, events });
  } catch (error) {
    res.status(500).json({ message: "Error fetching events", error });
  }
});

// Get Single Event Route
app.get("/events/:id", async (req, res) => {
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
});

// Update Event Route
app.put("/events/:id", async (req, res) => {
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
});

// Delete Event Route
app.delete("/events/:id", async (req, res) => {
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
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
