const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
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

clientSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
