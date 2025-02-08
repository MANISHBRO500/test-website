const express = require('express');
const Question = require('../models/question');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware to check if the user is a teacher
const isTeacher = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: "No token, authorization denied" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "Token is not valid" });
        if (decoded.role !== 'teacher') return res.status(403).json({ message: "Unauthorized" });
        next();
    });
};

// Publish a new question
router.post('/add', isTeacher, async (req, res) => {
    const { questionText, type, options } = req.body;
    try {
        const newQuestion = new Question({ questionText, type, options });
        await newQuestion.save();
        res.status(201).json({ message: "Question added successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
