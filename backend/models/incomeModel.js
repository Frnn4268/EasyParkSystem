const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    día: {
        type: Number,
        required: true
    },
    mes: {
        type: Number,
        required: true
    },
    año: {
        type: Number,
        required: true
    },
    monto: {
        type: Number,
        required: true
    },
    fecha_hora: {
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
