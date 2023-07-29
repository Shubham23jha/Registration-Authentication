const JWT = require("jsonwebtoken"); // Import the JSON Web Token library

// Define the jwtAuth middleware function
const jwtAuth = (req, res, next) => {
  // Extract the JWT token from the cookies in the request (if available)
  const token = (req.cookies && req.cookies.token) || null;

  // Check if the token exists
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Invalid token",
    });
  }

  try {
    // Verify the JWT token using the secret key stored in process.env.SECRET
    const payload = JWT.verify(token, process.env.SECRET);

    // If the token is valid, extract the user ID and email from the payload and add them to the request object
    req.user = { id: payload.id, email: payload.email };
  } catch (e) {
    // If an error occurs during JWT verification, return an error response
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }

  // Call the next middleware function or route handler in the chain
  next();
};

// Export the jwtAuth middleware function to be used in other files (e.g., in router or app.js)
module.exports = jwtAuth;
