const express = require('express');
const Answer = require('../models/answer');
const router = express.Router();

// Submit answers (students)
router.post('/submit', async (req, res) => {
    const { studentId, questionId, answerText } = req.body;
    const newAnswer = new Answer({ studentId, questionId, answerText });
    try {
        await newAnswer.save();
        res.status(200).json({ message: "Answer submitted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Grade answers (teachers)
router.post('/grade', async (req, res) => {
    const { answerId, marks } = req.body;
    try {
        const answer = await Answer.findById(answerId);
        if (!answer) return res.status(404).json({ message: "Answer not found" });

        answer.marks = marks;
        await answer.save();
        res.status(200).json({ message: "Answer graded successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
