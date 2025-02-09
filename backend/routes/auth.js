const express = require('express');
const { login } = require('../controllers/auth');  // Import the login function from the controller
const router = express.Router();

// Define the login route using the imported login function
router.post('/login', login);  // POST request to /login will call the login function from the controller

module.exports = router;  // Export the router to be used in the server.js
