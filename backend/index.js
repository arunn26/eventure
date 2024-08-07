const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const { getNextUserId, getNextTaskId } = require('./utils/idUtils');
require('dotenv').config(); // Import dotenv

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();


const eventRoutes = require("./routes/eventRoutes");
app.use("/events", eventRoutes);

const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

const taskRoutes = require('./routes/taskRoutes');
app.use('/tasks', taskRoutes);

const authRoutes = require('./routes/authRoutes');  // Import authRoutes
app.use('/auth', authRoutes);  // Use authRoutes

const PORT = process.env.PORT || 5000; // Use environment variable or default to 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
