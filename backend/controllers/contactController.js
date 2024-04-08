const Contact = require('../models/contactModel')
const createError = require('../utils/appError')

require('dotenv').config()

// Create a new contact
exports.createContact = async (req, res, next) => {
    try {
        const { name, email, message } = req.body;

        const newContact = await Contact.create({
            name,
            email,
            message
        });

        res.status(201).json({
            status: 'success',
            message: 'Contacto creado exitosamente!',
            data: newContact
        });
    } catch (error) {
        next(error);
    }
};

// Get all contacts
exports.getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find();

        res.status(200).json({
            status: 'success',
            data: contacts
        });
    } catch (error) {
        next(error);
    }
};

