const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./models/user");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Signup Route
app.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

// Login Route
app.post("/check", async (req, res) => {
  try {
    const { user, pass } = req.body;

    // Find the user in the database
    const foundUser = await User.findOne({ username: user });

    if (foundUser) {
      // Compare the password in plain text
      if (foundUser.password === pass) {
        // Successful login
        res.json({ success: true, username: foundUser.username });
      } else {
        // Incorrect password
        res.json({ success: false });
      }
    } else {
      // User not found
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: "Error checking user", error });
  }
});




const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
// User Data Route
app.get("/userdata", async (req, res) => {
  try {
    const { username } = req.query;
    
    if (!username) {
      return res.status(400).json({ success: false, message: "Username query parameter is required" });
    }

    const user = await User.findOne({ username });
    
    if (user) {
      res.json({ success: true, user });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: "Error fetching user data", error });
  }
});
