const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    firstname_owner: {
        type: String,
        required: true
    },
    lastname_owner: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: false
    }
});

customerSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
