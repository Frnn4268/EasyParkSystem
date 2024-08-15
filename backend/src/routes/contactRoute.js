const express = require('express')
const contactController = require('../controllers/contactController')

const router = express.Router()

// Contact route
router.get('/', contactController.getAllContacts)
router.post('/', contactController.createContact)
router.put('/:id', contactController.updateContact)
router.delete('/:id', contactController.deleteContact)

module.exports = router