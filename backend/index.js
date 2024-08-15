const express = require('express');

require('dotenv').config();
require('./src/config/mongoDBConnection');

const app = express();

// Logger Middleware
const logger = require('./src/middlewares/loggerMiddleware');
logger.info('Logger initialized');

// Security Middlewares
app.use(require('./src/middlewares/helmetMiddleware'));
app.use(require('./src/middlewares/corsMiddleware'));
app.use(require('./src/middlewares/rateLimiterMiddleware'));
require('./src/middlewares/sanitizeMiddleware')(app);
app.use(require('./src/middlewares/hppMiddleware'));

// General Middlewares
app.use(express.json());

// Routes
const authRoute = require('./src/routes/authRoute');
const contactRoute = require('./src/routes/contactRoute');
const userRoute = require('./src/routes/userRoute');
const userProfileRoute = require('./src/routes/userProfileRoute');
const customerRoute = require('./src/routes/CustomerRoute');
const parkingSpaceRoute = require('./src/routes/parkingSpaceRoute');
const parkingRoute = require('./src/routes/parkingEntryRoute');
const parkingTimeRoute = require('./src/routes/parkingTimeRoute');
const parkingTimeCustomerRoute = require('./src/routes/parkingTimeCustomerRoute');
const parkingPriceRoute = require('./src/routes/parkingPriceRoute');
const timeSearchParkingRoute = require('./src/routes/timeSearchParkingRoute');
const vehicleRoute = require('./src/routes/vehicleRoute');
const incomeRoute = require('./src/routes/incomeRoute');

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
app.use(require('./src/middlewares/errorHandlerMiddleware'));

// Error handling for unhandled rejections and uncaught exceptions
require('./src/middlewares/errorHandlingMiddleware')(logger);

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

// Connect to the database and then start the server
startServer();
