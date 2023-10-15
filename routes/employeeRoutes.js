const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
//This js controlls the routes of the server

// Get employees
router.get('/employees', employeeController.getEmployees);

// Create a new employee
router.post('/employees', employeeController.createEmployee);

// Get employee details by their ID
router.get('/employees/:eid', employeeController.getEmployeeById);

// Update employee details by  their ID
router.put('/employees/:eid', employeeController.updateEmployee);

// Delete employee by thier ID
router.delete('/employees', employeeController.deleteEmployee);

module.exports = router;
