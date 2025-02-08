const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Hardcoded teacher and student users with their passwords
const users = [
    {
        userId: 'teacher1',
        password: 'teacherPassword123',  // Hardcoded password for teacher
        role: 'teacher'
    },
    {
        userId: 'student1',
        password: 'studentPassword123',  // Hardcoded password for student
        role: 'student'
    }
];

// Login controller
const login = async (req, res) => {
    const { userId, password } = req.body;
    try {
        // Check if the user exists in the hardcoded list
        const user = users.find(u => u.userId === userId && u.password === password);

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token for the user
        const token = jwt.sign(
            { userId: user.userId, role: user.role }, // Payload includes userId and role
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expiration time
        );

        // Return the token to the frontend
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { login };
