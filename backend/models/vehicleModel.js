const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    placa: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
    fecha_hora_entrada: {
        type: Date,
        required: true
    },
    fecha_hora_salida: {
        type: Date,
        default: null
    },
    id_espacio_parqueo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParkingSpace',
        required: true
    },
    tiempo_estacionado: {
        type: Date,
        required: true
    }
});

vehicleSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
