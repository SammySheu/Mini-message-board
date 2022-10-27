const mongoose = require('mongoose');

const classicLineSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    lines: {
        type: String,
        require: true
    },
    time: {
        type: Date,
    }
});

const classicLine = mongoose.model('classicLines', classicLineSchema);
module.exports = classicLine; 