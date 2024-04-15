const express = require('express')
const clientController = require('../controllers/clientController')

const router = express.Router()

// Client route
router.get('/', clientController.getAllClients)
router.post('/', clientController.createClient)
router.put('/', clientController.updateClient)
router.delete('/', clientController.deleteClient)

module.exports = router
