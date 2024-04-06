const express = require('express');
const router =  express.Router();
const uploadController = require('../App/Controllers/UploadsController');

router.use('/processing',uploadController.processing)
router.use('/',uploadController.upload)
module.exports = router;