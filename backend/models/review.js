const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    dateTime: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Review', ReviewSchema);