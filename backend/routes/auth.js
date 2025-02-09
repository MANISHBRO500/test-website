const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// ✅ Hardcoded users (Ensure these credentials match what you're testing)
const users = [
    {
        userId: 'teacher1',
        password: 'teacherPassword123',
        role: 'teacher'
    },
    {
        userId: 'student1',
        password: 'studentPassword123',
        role: 'student'
    }
];

// ✅ Login Route (Fix validation issues)
router.post('/login', (req, res) => {
    const { userId, password } = req.body;

    // ✅ Ensure both fields are provided
    if (!userId || !password) {
        return res.status(400).json({ message: 'User ID and password are required.' });
    }

    // ✅ Find the user in the hardcoded list
    const user = users.find(u => u.userId === userId && u.password === password);

    if (!user) {
        return res.status(400).json({ message: 'Invalid user ID or password.' });
    }

    // ✅ Generate JWT token if login is successful
    const token = jwt.sign(
        { userId: user.userId, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({ token });
});

module.exports = router;
