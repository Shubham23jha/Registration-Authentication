const app = require("./app.js"); // Import the Express application from app.js

const port = process.env.PORT; // Retrieve the PORT environment variable to determine the server's listening port

// Start the server and make it listen on the specified port
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});