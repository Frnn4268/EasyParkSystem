const mongoose = require('mongoose');
const winston = require('winston');

const { MONGO_DB_URI } = process.env;

// Logger configuration
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/db.log' })
    ],
});

// Connect to MongoDB 
mongoose.connect(MONGO_DB_URI)
  .then(() => {
    logger.info('Database connected with MongoDB!');
  })
  .catch(err => {
    logger.error('Database connection error:', err);
    process.exit(1); // Exit the application if the database connection fails
  });

// Manage uncaught exceptions
process.on('uncaughtException', error => {
  logger.error('Uncaught Exception:', error);
  mongoose.disconnect()
    .then(() => process.exit(1));
});

// Manage unhandled promise rejections
process.on('unhandledRejection', error => {
  logger.error('Unhandled Rejection:', error);
  mongoose.disconnect()
    .then(() => process.exit(1));
});

// Disconnect from the database when the application is terminated
process.on('SIGINT', () => {
  mongoose.disconnect()
    .then(() => {
      logger.info('Database disconnected due to application termination');
      process.exit(0);
    });
});

process.on('SIGTERM', () => {
  mongoose.disconnect()
    .then(() => {
      logger.info('Database disconnected due to application termination');
      process.exit(0);
    });
});
