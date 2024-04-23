const express = require('express');
const router =  express.Router();
const sitesController = require('../App/Controllers/UserController');
router.use('/',sitesController.handleLogin)
module.exports = router;