const express = require('express');
const { login } = require('../controllers/auth'); // Import login function
const router = express.Router();

router.post('/login', login); // ✅ Route for logging in

module.exports = router;
