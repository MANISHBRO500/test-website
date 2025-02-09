const express = require('express');
const { login } = require('../controllers/auth');  // Make sure this path is correct
const router = express.Router();

router.post('/login', login);  // This will map the POST request to /auth/login to the login function

module.exports = router;
