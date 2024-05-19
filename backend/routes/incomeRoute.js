const express = require('express')
const incomeController = require('../controllers/incomeController')
const incomeStatisticsController = require('../controllers/incomeStatisticsController')

const router = express.Router()

// Income route
router.get('/', incomeController.getAllIncomes)
router.get('/last-income', incomeController.getLastIncome)
router.post('/', incomeController.createIncome)
router.put('/:id', incomeController.updateIncome)
router.delete('/:id', incomeController.deleteIncome)

// Income statistics route
router.get('/:period', incomeStatisticsController.getIncomesGroupedByPeriod);

module.exports = router