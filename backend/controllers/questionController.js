const Question = require('../models/question');

// Add a new question
const addQuestion = async (req, res) => {
    const { questionText, type, options } = req.body;
    try {
        const newQuestion = new Question({ questionText, type, options });
        await newQuestion.save();
        res.status(201).json({ message: "Question added successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all questions
const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { addQuestion, getQuestions };
