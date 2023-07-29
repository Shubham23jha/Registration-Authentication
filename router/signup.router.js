const express = require("express"); // Import the Express module
const {
  signup,
  signin,
  getuser,
  logout,
} = require("../controller/controller.singup.js"); // Import the controller functions for signup, signin, getuser, and logout
const jwtAuth = require("../middlewear/jwtAuth.js"); // Import the custom middleware for JWT authentication
const router = express.Router(); // Create an instance of Express Router

// Define routes and associate them with their corresponding controller functions

// Route for user signup (HTTP POST to /signup)
router.post("/signup", signup);

// Route for user signin (HTTP POST to /signin)
router.post("/signin", signin);

// Route for fetching user details (HTTP GET to /user)
// The jwtAuth middleware is used here to authenticate the request with JWT
router.get("/user", jwtAuth, getuser);

// Route for user logout (HTTP GET to /logout)
// The jwtAuth middleware is used here to authenticate the request with JWT
router.get("/logout", jwtAuth, logout);

// Export the router to be used in other files (e.g., in app.js)
module.exports = router;
