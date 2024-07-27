// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect("mongodb://127.0.0.1:27017/eventure")
//   .then(() => console.log("DB connection successful"))
//   .catch(() => console.log("DB connection failed"));

// // Define the User schema and model
// const userSchema = new mongoose.Schema({
//   username: String,
//   password: String
// });

// const User = mongoose.model('User', userSchema);

// // Signup Route
// app.post("/signup", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     // console.log(username)
//     // console.log(password)
//     const existingUser = await User.findOne({ username });

//     if (existingUser) {
//       return res.status(400).json({ message: "Username already exists" });
//     }

//     const newUser = new User({ username, password });
//     await newUser.save();
//     res.status(201).json({ message: "User created successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error creating user", error });
//   }
// });

// // Login Route
// app.post("/check", async (req, res) => {
//   try {
//     const { user, pass } = req.body;
//     // console.log('Request Body:', req.body); // Log the incoming request body

//     // Find the user in the database
//     const foundUser = await User.findOne({ username: user });
//     // console.log('Found User:', foundUser); // Log the result of the find operation

//     if (foundUser) {
//       // Compare the password in plain text
//       if (foundUser.password === pass) {
//         res.json(true);
//       } else {
//         res.json(false);
//       }
//     } else {
//       res.json(false);
//     }
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: "Error checking user", error });
//   }
// });


// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
