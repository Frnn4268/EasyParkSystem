const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    day: {
        type: Number,
        required: true
    },
    month: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    income: {
        type: Number,
        required: true
    },
    hour_date: {
        type: Date,
        required: true
    }
});

incomeSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;
