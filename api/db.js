const mongoose = require("mongoose");

let isConnected = false;
let connectionPromise = null;

async function connectDB(uri) {
    if (isConnected && mongoose.connection.readyState === 1) {
        return;
    }

    if (connectionPromise) {
        return connectionPromise;
    }

    connectionPromise = (async () => {
        try {
            if (mongoose.connection.readyState === 1) {
                isConnected = true;
                return;
            }

            await mongoose.disconnect().catch(() => {});

            await mongoose.connect(uri, {
                bufferCommands: false,
                maxPoolSize: 10,
                serverSelectionTimeoutMS: 5000,
                socketTimeoutMS: 45000,
            });

            isConnected = true;
            console.log("MongoDB connecté");

            mongoose.connection.on('disconnected', () => {
                isConnected = false;
                connectionPromise = null;
            });

            mongoose.connection.on('error', (err) => {
                console.error("MongoDB connection error:", err);
                isConnected = false;
                connectionPromise = null;
            });

        } catch (error) {
            console.error("MongoDB connection error:", error);
            connectionPromise = null;
            throw error;
        }
    })();

    return connectionPromise;
}

async function disconnectDB() {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.disconnect();
        isConnected = false;
        connectionPromise = null;
    }
}

async function getDBState() {
    return {
        readyState: mongoose.connection.readyState,
        isConnected
    };
}

module.exports = { connectDB, disconnectDB, getDBState };
