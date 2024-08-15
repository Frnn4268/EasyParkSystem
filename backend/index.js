const express = require('express');
const mongoose = require('mongoose');
const winston = require('winston');

require('dotenv').config();
require('./config/mongoDBConnection');

const app = express();

// Configuración del logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/server.log' })
    ],
});

// Security Middlewares
app.use(require('./middlewares/helmetMiddleware'));
app.use(require('./middlewares/corsMiddleware'));
app.use(require('./middlewares/rateLimiterMiddleware'));
require('./middlewares/sanitizeMiddleware')(app);
app.use(require('./middlewares/hppMiddleware'));

// General Middlewares
app.use(express.json());

// Routes
const authRoute = require('./routes/authRoute');
const contactRoute = require('./routes/contactRoute');
const userRoute = require('./routes/userRoute');
const userProfileRoute = require('./routes/userProfileRoute');
const customerRoute = require('./routes/CustomerRoute');
const parkingSpaceRoute = require('./routes/parkingSpaceRoute');
const parkingRoute = require('./routes/parkingEntryRoute');
const parkingTimeRoute = require('./routes/parkingTimeRoute');
const parkingTimeCustomerRoute = require('./routes/parkingTimeCustomerRoute');
const parkingPriceRoute = require('./routes/parkingPriceRoute');
const timeSearchParkingRoute = require('./routes/timeSearchParkingRoute');
const vehicleRoute = require('./routes/vehicleRoute');
const incomeRoute = require('./routes/incomeRoute');

// Use routes
app.use('/api/auth', authRoute);
app.use('/api/contact', contactRoute);
app.use('/api/user', userRoute);
app.use('/api/user-profile', userProfileRoute);
app.use('/api/customer', customerRoute);
app.use('/api/parking_space', parkingSpaceRoute);
app.use('/api/parking-space', parkingRoute);
app.use('/api/parking-time', parkingTimeRoute);
app.use('/api/parking-time-customer', parkingTimeCustomerRoute);
app.use('/api/parking-price', parkingPriceRoute);
app.use('/api/parking-search', timeSearchParkingRoute);
app.use('/api/vehicle', vehicleRoute);
app.use('/api/income', incomeRoute);

// Global error handler middleware
app.use(require('./middlewares/errorHandlerMiddleware'));

// Server initialization
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        // Start server
        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode!`);
        });
    } catch (err) {
        logger.error('Failed to start server:', err);
        process.exit(1);
    }
};

// Unhandled promise rejections
process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Rejection:', err);
    process.exit(1);
});

// Uncaught exceptions
process.on('uncaughtException', (err) => {
    logger.error('Uncaught Exception:', err);
    process.exit(1);
});

// Connect to the database and then start the server
startServer();
