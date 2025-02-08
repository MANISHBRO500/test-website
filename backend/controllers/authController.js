const bcrypt = require('bcryptjs');
const User = require('../models/user');

// Register a new user (with role)
const register = async (req, res) => {
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
};

module.exports = { register };
