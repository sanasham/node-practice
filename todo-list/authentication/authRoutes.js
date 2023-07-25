const express = require('express');
const router = express.Router();
const userController = require('./authController.js');
router.get('/', userController.userInfo);
module.exports = router;
