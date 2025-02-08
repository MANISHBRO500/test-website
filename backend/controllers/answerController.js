const Answer = require('../models/answer');

// Submit answers (students)
const submitAnswer = async (req, res) => {
    const { answers } = req.body;
    try {
        for (const ans of answers) {
            const { questionId, answerText } = ans;
            const newAnswer = new Answer({
                studentId: req.userId, // Assuming `req.userId` is set by the middleware
                questionId,
                answerText
            });
            await newAnswer.save();
        }
        res.status(200).json({ message: "Answers submitted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Grade answers (teachers)
const gradeAnswer = async (req, res) => {
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
};

module.exports = { submitAnswer, gradeAnswer };
