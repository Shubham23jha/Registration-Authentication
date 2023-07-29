# Registration-Authentication



## Project Description

This is a web application designed to provide users with a seamless and secure registration and authentication process. It allows users to sign up with their name, email, and password and then securely stores their information in a MongoDB database. The application utilizes JSON Web Tokens (JWT) for authentication, ensuring that user data is protected and secure.

### Key Features

- **User Signup:** Users can create a new account by providing their name, email, password, and confirming the password. The application validates the email format and ensures that all required fields are filled.

- **User Signin:** Registered users can sign in using their email and password. The application verifies the provided credentials, and upon successful authentication, issues a JWT access token, granting them access to protected routes.

- **Secure Password Storage:** User passwords are hashed using the bcrypt library before being stored in the database. This ensures that passwords are securely stored, protecting users from unauthorized access.

- **JWT-based Authentication:** The application uses JSON Web Tokens (JWT) to handle user authentication. JWTs are issued upon successful signin and are included in the response cookies for subsequent authenticated requests.

- **User Profile:** Authenticated users can access their user profile, which displays their name and email. The user profile is protected, and only accessible with a valid JWT token.

- **Logout:** Users can log out of their account, which clears the JWT token from the cookies, ensuring a secure logout process.





## Dependencies

- **Node.js (version 18.16.0):** Node.js is a JavaScript runtime that allows us to run JavaScript code outside of a web browser. It provides an event-driven, non-blocking I/O model, making it efficient and suitable for server-side applications. [Download Node.js](https://nodejs.org/en/download/)

- **Express.js (version 4.18.2):** Express.js is a fast and minimalist web application framework for Node.js. It simplifies the process of building robust APIs and web applications, providing a set of essential features and middleware. [Express.js Documentation](https://expressjs.com/)

- **Mongoose (version 7.3.2):** Mongoose is an Object Data Modeling (ODM) library for MongoDB and provides an easy way to interact with the MongoDB database. It enables us to define schemas and models, simplifying data validation and manipulation. [Mongoose Documentation](https://mongoosejs.com/)

- **JSON Web Tokens (JWT) (version 9.0.1):** JSON Web Tokens (JWT) are a compact and URL-safe means of representing claims between two parties. They are commonly used for authentication and secure communication. [JWT Documentation](https://jwt.io/)

- **bcrypt (version 5.1.0):** bcrypt is a password-hashing library that securely hashes passwords, protecting them from unauthorized access. It uses a one-way hash function to ensure password security. [bcrypt Documentation](https://www.npmjs.com/package/bcrypt)

- **email-validator (version 2.0.4):** email-validator is a library to validate email addresses according to email RFCs. It helps ensure that email addresses provided during user registration are valid and properly formatted. [email-validator Documentation](https://www.npmjs.com/package/email-validator)

- **cookie-parser (version 1.4.6):** cookie-parser is a middleware for parsing cookies in Express.js applications. It helps handle cookies sent by the client, allowing you to access and manage cookies in your server-side code. [cookie-parser Documentation](https://www.npmjs.com/package/cookie-parser)

- **cors (version 2.8.5):** cors is a middleware for handling Cross-Origin Resource Sharing (CORS) in Express.js applications. It allows your server to handle requests from different origins, enabling cross-origin communication. [cors Documentation](https://www.npmjs.com/package/cors)

- **nodemon (version 3.0.1):** nodemon is a utility that monitors changes in your Node.js application and automatically restarts the server when file changes are detected. It's commonly used during development to streamline the development process. [nodemon Documentation](https://www.npmjs.com/package/nodemon)

- **dotenv (version 16.3.1):** dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`. It's useful for managing configuration settings and sensitive data in development environments. [dotenv Documentation](https://www.npmjs.com/package/dotenv)

## API Endpoints

- POST `/signup`: Register a new user by providing their name, email, password, and confirmPassword in the request body.

- POST `/signin`: Sign in with the registered email and password to get an access token. The token will be included in the response cookies.

- GET `/getuser`: Get user information by providing the JWT access token in the request cookies.

- GET `/logout`: Log out the user by clearing the access token from the response cookies.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   ```

2. Install dependencies:

   ```bash
   cd your-repo
   npm install
   ```

3. Set up environment variables:

   - Create a `.env` file in the root of the project.
   - Add the following environment variables and set their values:

     ```dotenv
     PORT=3000
     MONGO_URI=mongodb://your-mongodb-connection-string
     SECRET=your-secret-key-for-JWT
     ```

## Usage

To start the server, run:

```bash
npm start
```

The server will be accessible at `http://localhost:3000` (or the port specified in your `.env` file).


### Contact

If you have any questions or need further information, feel free to contact:

- Shubham Kumar Jha
- **Email:** skj23072002@gmail.com
- https://github.com/Shubham23jha

