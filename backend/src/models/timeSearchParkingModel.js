const { mongoose } = require('mongoose');

const timeSearchParking = new mongoose.Schema({
    hour_date_entry: {
        type: Date,
        required: true
    },
    hour_date_output: {
        type: Date,
        default: null
    },
    time_search_parking: {
        type: Date,
        default: null
    },
});

timeSearchParking.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id;
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

const TimeSearchParking = mongoose.model('TimeSearchParking', timeSearchParking);
module.exports = TimeSearchParking;