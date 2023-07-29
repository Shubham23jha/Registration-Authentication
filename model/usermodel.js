const mongoose = require("mongoose"); // Import the Mongoose library for MongoDB interaction
const JWT = require("jsonwebtoken"); // Import JSON Web Token library for token generation
const bcrypt = require("bcrypt"); // Import bcrypt for password hashing

const { Schema } = mongoose; // Destructure the Schema object from mongoose

// Define the userSchema using the Mongoose Schema constructor
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      minLength: [5],
      maxLength: [50],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email id"],
      lowercase: true,
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      select: false, // The password field will not be returned in query results by default
    },
    forgetpasswordtoken: {
      type: String,
    },
    forgetexpiredate: {
      type: String,
    },
  },
  { timestamp: true } // Options for adding timestamps for "createdAt" and "updatedAt" fields
);

// Define a pre-save hook to hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // If the password is not modified, move to the next middleware
  }

  try {
    const saltRounds = 10; // The number of rounds for bcrypt to generate a salt
    const hashedPassword = await bcrypt.hash(this.password, saltRounds); // Hash the password using bcrypt
    this.password = hashedPassword; // Store the hashed password in the schema
    return next();
  } catch (error) {
    return next(error); // If an error occurs, move to the error handling middleware
  }
});

// Define a method for generating a JWT token for the user
userSchema.methods = {
  jwttoken() {
    // This method generates a JSON Web Token (JWT) containing user ID and email
    return JWT.sign({ id: this.id, email: this.email }, process.env.SECRET, {
      expiresIn: "24h", // The token will expire in 24 hours
    });
  },
};

// Create the userModel using the userSchema and export it
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
