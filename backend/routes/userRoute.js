const express = require('express')
const userController = require('../controllers/userController')

const router = express.Router()

// user route
router.get('/', userController.getAllUsers)
router.post('/', userController.createUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

module.exports = router