const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    answerText: String, // MCQ or Short/Long Answer
    marks: { type: Number, default: 0 }
});

module.exports = mongoose.model('Answer', answerSchema);
