const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/question');
const answerRoutes = require('./routes/answer');

// Load environment variables
dotenv.config();

const app = express();

// Enable CORS with specific frontend URLs
app.use(cors({
    origin: [
        'https://your-frontend-url.github.io',  // GitHub Pages URL
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowing specific methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allowing headers
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Your routes
app.use('/auth', authRoutes);
app.use('/questions', questionRoutes);
app.use('/answers', answerRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Start the server
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
});
