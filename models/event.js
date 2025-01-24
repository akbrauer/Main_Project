const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true
    },
    time: String,
    notes: String,
});

module.exports = mongoose.model("Event", eventSchema);