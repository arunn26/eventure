const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./models/user");
const Event = require("./models/event");
const { getNextUserId , getNextEventId} = require('./utils/idUtils');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();



// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate that both fields are provided
    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Get the next user ID
    const nextUserId = await getNextUserId();

    // Create a new user
    const newUser = new User({ userid: nextUserId, username, password });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: "Error creating user", error });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body; // Ensure it matches the frontend

    const foundUser = await User.findOne({ username }); // Match with 'username'

    if (foundUser) {
      if (foundUser.password === password) {
        res.json({ success: true, username: foundUser.username, token: "dummy-token" }); // Ensure response includes 'username' and 'token'
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
