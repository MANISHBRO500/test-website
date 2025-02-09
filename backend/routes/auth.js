const jwt = require('jsonwebtoken');

// Hardcoded users
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

// Login function
const login = (req, res) => {
    const { userId, password } = req.body;

    // Log incoming data for debugging
    console.log("Received request:", req.body);
    console.log("userId:", userId, "password:", password);

    // Validate if both fields are present
    if (!userId || !password) {
        console.log("Error: Missing userId or password");
        return res.status(400).json({ message: '❌ User ID and password are required.' });
    }

    // Check if user exists
    const user = users.find(u => u.userId === userId && u.password === password);
    if (!user) {
        console.log("Error: Invalid user ID or password");
        return res.status(400).json({ message: '❌ Invalid user ID or password.' });
    }

    // Generate JWT token
    const token = jwt.sign(
        { userId: user.userId, role: user.role },
        process.env.JWT_SECRET || 'defaultSecret', // Use secret from .env
        { expiresIn: '1h' } // Token expiration time
    );

    console.log("Login successful: Token generated");

    res.json({ token });
};

module.exports = { login };  // Ensure this is exporting the login function
