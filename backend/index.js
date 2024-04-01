const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()
require('./config/mongoDBConnection')

const app = express()

// Routes 
const authRoute = require('./routes/authRoute')

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoute)

// Global error handler
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