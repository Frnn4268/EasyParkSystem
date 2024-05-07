const ParkingSpace = require('../models/parkingSpaceModel.js');

exports.getLatestParkingSpaceById = async (req, res, next) => {
    const { id } = req.params;

    try {
        const latestParkingSpace = await ParkingSpace.findOne({
            _id: id,
            hour_date_output: null 
        })
        .sort({ hour_date_entry: -1 })
        .limit(1);

        if (!latestParkingSpace) {
            return res.status(404).json({ message: 'No se encontró ningún espacio de parqueo para el ID de colección proporcionado con una fecha de salida nula.' });
        }

        res.status(200).json(latestParkingSpace);
    } catch (error) {
        next(error);
    }
};
