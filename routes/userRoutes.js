const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// This route is controlls for user sign up and login 
// User signups
router.post('/signup', userController.signup);

// User logins
router.post('/login', userController.login);

module.exports = router;
