// Import necessary modules and libraries
const userModel = require("../model/usermodel.js");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");

// Function to handle user registration (signup)
const signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body; // Extract data from request body
  console.log(name, email, password, confirmPassword); // Log the received data for debugging

  try {
    // Validation checks for required fields
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Validate email using 'email-validator' library
    const isEmailValid = emailValidator.validate(email);
    if (!isEmailValid) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid email",
      });
    }

    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password do not match",
      });
    }

    // Create a new user object and save it to the database
    const userInfo = userModel(req.body);
    const result = await userInfo.save();

    // Send a success response with the saved user data
    return res.status(200).json({
      success: true,
      data: result,
    });
  } catch (e) {
    // Handle errors during signup process
    if (e.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Account already exists",
      });
    }
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

// Function to handle user login (signin)
const signin = async (req, res) => {
  const { email, password } = req.body; // Extract email and password from request body

  // Check if both email and password are provided
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please enter your email and password",
    });
  }

  try {
    // Find the user with the given email and select the password field from the database
    const use = await userModel.findOne({ email }).select("+password");

    // Check if user exists and compare the provided password with the hashed password in the database
    if (!use || !(await bcrypt.compare(password, use.password))) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate a JWT token, remove the password field from the user object, set the token as a cookie, and send a success response
    const token = use.jwttoken();
    use.password = undefined;
    const cookieOptions = {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true,
    };
    res.cookie("token", token, cookieOptions);
    return res.status(200).json({
      success: true,
      data: use,
    });
  } catch (error) {
    // Handle errors during signin process
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Function to get user details (protected route)
const getuser = async (req, res) => {
  const userId = req.user.id; // Extract user ID from the authenticated request object

  try {
    // Find the user by ID and send a success response with the user data
    const user = await userModel.findById(userId);
    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (e) {
    // Handle errors when retrieving user details
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

// Function to handle user logout
const logout = (req, res) => {
  try {
    // Clear the token cookie, effectively logging out the user, and send a success response
    const cookieOptions = {
      expires: new Date(),
      httpOnly: true,
    };
    res.cookie("token", null, cookieOptions);
    res.status(200).json({ success: true, message: "LOGOUT" });
  } catch (e) {
    // Handle errors during logout process
    return res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

// Export the signup, signin, getuser, and logout functions as the module's public interface
module.exports = {
  signup,
  signin,
  getuser,
  logout,
};
