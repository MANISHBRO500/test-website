const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const questionRoutes = require('./routes/question');
const answerRoutes = require('./routes/answer');

// Load environment variables from .env file
dotenv.config();

const app = express();

// ✅ Set up CORS to allow requests from GitHub Pages
app.use(cors({
    origin: ['https://manishbro500.github.io'], // Only allow requests from this frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow the listed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow these headers
}));

// Middleware to parse incoming JSON data
app.use(express.json());

// Routes
app.use('/auth', authRoutes);  // Routes for authentication (login)
app.use('/questions', questionRoutes);  // Routes for questions
app.use('/answers', answerRoutes);  // Routes for answers

// Connect to MongoDB using the connection string in .env
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.log("Error connecting to MongoDB: ", err));

// Start the Express server on the specified port (or default to 5000)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
