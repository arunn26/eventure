const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const User = require("./models/user");
const Task = require("./models/task");
const { getNextUserId, getNextTaskId } = require('./utils/idUtils');

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
    const { username, password } = req.body;

    const foundUser = await User.findOne({ username });

    if (foundUser) {
      if (foundUser.password === password) {
        res.json({
          success: true,
          username: foundUser.username,
          userId: foundUser._id,  // Include userId in the response
        });
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

app.post('/changepassword', async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body; // Retrieve userId from request body

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (currentPassword !== user.password) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

const eventRoutes = require("./routes/eventRoutes");
app.use("/events", eventRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const taskRoutes = require('./routes/taskRoutes');
app.use('/tasks', taskRoutes);

// Task Routes
app.post("/tasks", async (req, res) => {
  try {
    const { title, description, status } = req.body;

    if (!title || !description || !status) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled' });
    }

    const taskid = await getNextTaskId();
    const newTask = new Task({ taskid, title, description, status });
    await newTask.save();
    res.status(201).json({ success: true, message: 'Task created successfully' });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ success: false, message: 'Error creating task', error });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json({ success: true, tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ success: false, message: 'Error fetching tasks', error });
  }
});

app.get("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findOne({ taskid: req.params.id });
    if (task) {
      res.json({ success: true, task });
    } else {
      res.status(404).json({ success: false, message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching task", error });
  }
});

app.put("/tasks/:id", async (req, res) => {
  try {
    const { title, description, status } = req.body;
    const updatedTask = await Task.findOneAndUpdate(
      { taskid: req.params.id },
      { title, description, status },
      { new: true }
    );
    if (updatedTask) {
      res.json({ success: true, message: "Task updated successfully", task: updatedTask });
    } else {
      res.status(404).json({ success: false, message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating task", error });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ taskid: req.params.id });
    if (deletedTask) {
      res.json({ success: true, message: "Task deleted successfully" });
    } else {
      res.status(404).json({ success: false, message: "Task not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting task", error });
  }
});


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
