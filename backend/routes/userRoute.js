const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

// user route
router.get('/', userController.getAllUsers)
router.post('/', userController.createUser)
router.put('/', userController.updateUser)
router.delete('/', userController.deleteUser)

module.exports = router