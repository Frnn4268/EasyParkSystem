const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()
require('./config/mongoDBConnection')

const app = express()

// Routes 
const authRoute = require('./routes/authRoute')
const contactRoute = require('./routes/contactRoute')
const userRoute = require('./routes/userRoute')
const customerRoute = require('./routes/CustomerRoute')
const parkingSpaceRoute = require('./routes/parkingSpaceRoute')
const parkingRoute = require('./routes/parkingEntryRoute')
const parkingTimeRoute = require('./routes/parkingTimeRoute')
const parkingTimeCustomerRoute = require('./routes/parkingTimeCustomerRoute')
const vehicleRoute = require('./routes/vehicleRoute')
const incomeRoute = require('./routes/incomeRoute')
const parkingPriceRoute = require('./routes/parkingPriceRoute')

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoute) // Auth
app.use('/api/contact', contactRoute) // Contact
app.use('/api/user', userRoute) // User
app.use('/api/customer', customerRoute) // Customer
app.use('/api/parking_space', parkingSpaceRoute) // Parking space
app.use('/api/parking-space', parkingRoute) // Parking Spaces
app.use('/api/parking-time', parkingTimeRoute) // Parking Spaces
app.use('/api/parking-time-customer', parkingTimeCustomerRoute) // Parking Spaces
app.use('/api/parking-price', parkingPriceRoute) // Parking Price
app.use('/api/vehicle', vehicleRoute) // Vehicle
app.use('/api/income', incomeRoute) // Income
 

// Global error handler
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

// Server 
const PORT = process.env.PORT
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${PORT}!`)
})
