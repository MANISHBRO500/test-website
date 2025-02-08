const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/question');
const answerRoutes = require('./routes/answer');

// Load environment variables
dotenv.config();

const app = express();

// Enable CORS for GitHub Pages
app.use(cors({
    origin: 'https://manishbro500.github.io/test-website/frontend',  // Replace with your actual GitHub Pages URL
    methods: ['GET', 'POST'],  // Allow only GET and POST methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow headers like Content-Type and Authorization
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Use routes
app.use('/auth', authRoutes);
app.use('/questions', questionRoutes);
app.use('/answers', answerRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
