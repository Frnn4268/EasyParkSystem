const Contact = require('../models/contactModel')
const createError = require('../utils/appError')
const sendEmail = require('../utils/nodemailer')

require('dotenv').config()

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

// Create a new contact
exports.createContact = async (req, res, next) => {
    try {
        const { name, email, message } = req.body;

        const newContact = await Contact.create({
            name,
            email,
            message
        });

        // Send confirmation email
        await sendEmail({
            email: newContact.email,
            subject: 'Confirmación de Contacto',
            message: `Hola ${newContact.name},\n\nGracias por contactarnos. Pronto un administrador se pondrá en contacto contigo.\n\nSaludos,\nEquipo de Soporte`
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

// Update a contact
exports.updateContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, email, message } = req.body;

        const updatedContact = await Contact.findByIdAndUpdate(id, {
            name,
            email,
            message
        }, { new: true });

        if (!updatedContact) {
            return next(createError(404, 'Contacto no encontrado'));
        }

        res.status(200).json({
            status: 'success',
            message: 'Contacto actualizado exitosamente!',
            data: updatedContact
        });
    } catch (error) {
        next(error);
    }
};

// Delete a contact
exports.deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deletedContact = await Contact.findByIdAndDelete(id);

        if (!deletedContact) {
            return next(createError(404, 'Contacto no encontrado'));
        }

        res.status(204).json({
            status: 'success',
            message: 'Contacto eliminado exitosamente!',
            data: null
        });
    } catch (error) {
        next(error);
    }
};