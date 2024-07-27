const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/eventure")
    .then(() => console.log("DB connection successful"))
    .catch(() => console.log("DB connection failed"))
};

module.exports = connectDB;


