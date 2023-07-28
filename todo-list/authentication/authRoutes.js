const express = require('express');
const router = express.Router();
const userController = require('./authController.js');
router.get('/', userController.userInfo);
router.post('/signup', userController.userSignup);
router.post('/login', userController.userLogin);
module.exports = router;
