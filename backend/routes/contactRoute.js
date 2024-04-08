const express = require('express')
const contactController = require('../controllers/contactController')

const router = express.Router()

// Contact route
router.post('/', contactController.createContact)
router.get('/', contactController.getAllContacts)

module.exports = router