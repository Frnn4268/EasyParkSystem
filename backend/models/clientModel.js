const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    placa: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    nombre_propietario: {
        type: String,
        required: true
    },
    apellido_propietario: {
        type: String,
        required: true
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
