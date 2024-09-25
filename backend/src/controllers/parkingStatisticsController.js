const ParkingSpace = require('../models/parkingSpaceModel');
const TimeSearchParking = require('../models/timeSearchParkingModel');

exports.getTotalCustomersPerDayOfMonth = async (req, res) => {
    try {
        const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const nextMonthStart = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);

        const customersPerDay = await ParkingSpace.aggregate([
            { $match: { hour_date_entry: { $gte: monthStart, $lt: nextMonthStart } } },
            {
                $group: {
                    _id: { $dayOfMonth: "$hour_date_entry" },
                    totalCustomers: { $sum: 1 }
                }
            },
            { $sort: { '_id': 1 } }
        ]);

        res.status(200).json(customersPerDay);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTotalVehiclesPerDayOfMonth = async (req, res) => {
    try {
        const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const nextMonthStart = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);

        const vehiclesPerDay = await ParkingSpace.aggregate([
            { $match: { hour_date_entry: { $gte: monthStart, $lt: nextMonthStart } } },
            {
                $group: {
                    _id: { $dayOfMonth: "$hour_date_entry" },
                    totalVehicles: { $sum: 1 }
                }
            },
            { $sort: { '_id': 1 } }
        ]);

        res.status(200).json(vehiclesPerDay);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAvailableAndOccupiedSpaces = async (req, res) => {
    try {
        const latestStates = await ParkingSpace.aggregate([
            {
                $group: {
                    _id: "$parking_space_id",
                    latestState: { $last: "$$ROOT" }
                }
            }
        ]);

        const availableSpaces = latestStates.filter(space => space.latestState.state === 'Disponible').length;
        const occupiedSpaces = latestStates.filter(space => space.latestState.state === 'Ocupado').length;

        res.status(200).json({ availableSpaces, occupiedSpaces });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTotalUsagePerSpace = async (req, res) => {
    try {
        const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const nextMonthStart = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);

        const usagePerSpace = await ParkingSpace.aggregate([
            { $match: { hour_date_entry: { $gte: monthStart, $lt: nextMonthStart } } },
            {
                $group: {
                    _id: "$parking_space_id",
                    usageCount: { $sum: 1 }
                }
            },
            { $sort: { '_id': 1 } }
        ]);

        res.status(200).json(usagePerSpace);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getTotalDailyCustomers = async (req, res) => {
    try {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        const tomorrowStart = new Date(todayStart);
        tomorrowStart.setDate(todayStart.getDate() + 1);

        const dailyCustomers = await ParkingSpace.countDocuments({
            hour_date_entry: { $gte: todayStart, $lt: tomorrowStart }
        });

        res.status(200).json({ totalCustomers: dailyCustomers });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAverageParkingTime = async (req, res) => {
    try {
        const averageParkingTime = await ParkingSpace.aggregate([
            { $match: { hour_date_output: { $ne: null } } },
            {
                $project: {
                    parkingTime: {
                        $divide: [{ $subtract: ["$hour_date_output", "$hour_date_entry"] }, 1000 * 60]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    averageTime: { $avg: "$parkingTime" }
                }
            }
        ]);

        res.status(200).json({ averageParkingTime: averageParkingTime[0]?.averageTime || 0 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getLongestParkingDurationOfMonth = async (req, res) => {
    try {
        const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const nextMonthStart = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);

        const longestParkingDuration = await ParkingSpace.aggregate([
            { $match: { hour_date_entry: { $gte: monthStart, $lt: nextMonthStart }, hour_date_output: { $ne: null } } },
            {
                $project: {
                    parkingDuration: {
                        $divide: [{ $subtract: ["$hour_date_output", "$hour_date_entry"] }, 1000 * 60]
                    }
                }
            },
            { $sort: { parkingDuration: -1 } },
            { $limit: 1 }
        ]);

        res.status(200).json({ longestParkingDuration: longestParkingDuration[0]?.parkingDuration || 0 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAverageTimeSearchParking = async (req, res) => {
    try {
        const averageParkingTime = await TimeSearchParking.aggregate([
            { $match: { hour_date_output: { $ne: null } } },
            {
                $project: {
                    parkingDuration: {
                        $divide: [{ $subtract: ["$hour_date_output", "$hour_date_entry"] }, 1000] 
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    averageTime: { $avg: "$parkingDuration" }
                }
            }
        ]);

        res.status(200).json({ averageTimeInSeconds: averageParkingTime[0]?.averageTime || 0 });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};