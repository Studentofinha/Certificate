const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
    content: { type: String, required: true },
    courseName: { type: String, required: true },
    comment: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
});

module.exports = mongoose.model('Post', postSchema)
