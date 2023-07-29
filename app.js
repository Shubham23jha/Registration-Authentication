// Load environment variables from .env file (if available)
require("dotenv").config();

// Import required modules and libraries
const express = require("express"); // Express.js for creating the web application
const cookieParser = require("cookie-parser"); // Middleware for parsing cookies
const connectToDb = require("./config/config.database.js"); // Custom function to connect to the database
const router = require("./router/signup.router.js"); // Express router for handling signup routes
const cors = require("cors"); // Middleware for handling Cross-Origin Resource Sharing (CORS)

// Create an instance of the Express application
const app = express();

// Connect to the database (assuming connectToDb is a function that handles the connection)
connectToDb();

// Middleware setup
app.use(cookieParser()); // Use cookie-parser middleware to parse cookies from incoming requests
app.use(cors()); // Use CORS middleware to handle Cross-Origin Resource Sharing
app.use(express.json()); // Parse incoming JSON data

// Define routes
app.use("/", router); // Mount the signup router on the root path (e.g., /signup)

// Optionally, you may mount more routers for other routes under /api/ path
app.use("/api/", router); // Mount the signup router on the /api/ path (e.g., /api/signup)

// Export the app to be used in other files
module.exports = app;
