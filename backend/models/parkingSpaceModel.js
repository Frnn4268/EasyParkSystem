const mongoose = require('mongoose');

const parkingSpaceSchema = new mongoose.Schema({
    estado: {
        type: String,
        required: true,
        enum: ['Ocupado', 'Disponible']
    }
});

parkingSpaceSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const ParkingSpace = mongoose.model('ParkingSpace', parkingSpaceSchema);

module.exports = ParkingSpace;
