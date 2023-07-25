const express = require('express');
const router = express.Router();
const userController = require('./authController.js');
router.get('/', userController.userInfo);
router.post('/signup', userController.signUp);
router.post('/login', userController.login);
module.exports = router;
