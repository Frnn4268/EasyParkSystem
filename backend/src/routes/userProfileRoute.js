const express = require('express')
const userProfileController = require('../controllers/userProfileController')

const router = express.Router()

// user route
router.get('/:id', userProfileController.getById);
router.put('/:id', userProfileController.updateUser);

module.exports = router