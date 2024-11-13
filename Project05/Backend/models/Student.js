const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true, min: 18, max: 65 },
    major: { type: String, required: true },
    courses: [{ type: String }]
});

module.exports = mongoose.model('Student', studentSchema);
