const mongoose = require("mongoose");

let isConnected = false;

async function connectDB(uri) {
    if (isConnected) return;

    try {
        await mongoose.connect(uri, {
            bufferCommands: false
        });
        isConnected = true;
        console.log("MongoDB connecté");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}

module.exports = connectDB;
