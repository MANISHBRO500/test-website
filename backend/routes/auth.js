const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken'); // For generating JWT tokens
const router = express.Router();

// Register a new user (with role)
router.post('/register', async (req, res) => {
    const { userId, password, role } = req.body;

    // Ensure valid role
    if (role !== 'teacher' && role !== 'student') {
        return res.status(400).json({ message: 'Role must be either "teacher" or "student"' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ userId });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ userId, password: hashedPassword, role });

    try {
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err.message });
    }
});

// Login user (authenticate user)
router.post('/login', async (req, res) => {
    const { userId, password } = req.body;

    const user = await User.findOne({ userId });
    if (!user) return res.status(400).json({ message: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token and include the user's role
    const token = jwt.sign(
        { userId: user.userId, role: user.role }, // Add the role to the JWT payload
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({ token });
});

module.exports = router;
