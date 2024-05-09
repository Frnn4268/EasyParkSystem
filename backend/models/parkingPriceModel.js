const mongoose = require('mongoose');

const parkingPriceSchema = new mongoose.Schema({
    price: {
        type: Number,
        required: true
    },
    time_in_hours: {
        type: Number,
        required: true
    },
    hour_date: {
        type: Date,
        required: true
    }
});

parkingPriceSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const ParkingPrice = mongoose.model('ParkingPrice', parkingPriceSchema);

module.exports = ParkingPrice;
