const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    questionText: { type: String, required: true },
    type: { type: String, enum: ['mcq', 'short', 'long'], required: true },
    options: [String], // Only for MCQs
});

module.exports = mongoose.model('Question', questionSchema);
