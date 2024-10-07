const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB connection successful");
    } catch (error) {
        console.error("DB connection failed", error);
    }
};

module.exports = connectDB;
