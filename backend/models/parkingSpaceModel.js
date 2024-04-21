const mongoose = require('mongoose');

const parkingSpaceSchema = new mongoose.Schema({
    parking_space_id: {
        type: Number,
        required: true
    },
    state: {
        type: String,
        required: true,
        enum: ['Ocupado', 'Disponible']
    },
    hour_date_entry: {
        type: Date,
        required: true
    },
    hour_date_output: {
        type: Date,
        default: null
    },
    timed_parking_space: {
        type: Date,
        default: null
    },
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
