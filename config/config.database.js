const mongoose = require("mongoose");

// Function to connect to the MongoDB database
const connectToDb = async () => {
  try {
    // Get the MongoDB connection URI from the environment variables
    const uri = process.env.MONGO_URI;
    // Use Mongoose to establish a connection to the database
    const conn = await mongoose.connect(uri);
    // If the connection is successful, log the host of the connected database
    console.log(`Connected to database: ${conn.connection.host}`);
  } catch (error) {
    // If an error occurs during connection, log the error message and exit the process
    console.error(error.message);
    process.exit(1);
  }
};

// Export the connectToDb function so it can be used elsewhere in the application
module.exports = connectToDb;
