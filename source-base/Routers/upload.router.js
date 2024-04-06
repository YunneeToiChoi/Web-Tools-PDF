const express = require('express');
const router =  express.Router();
const uploadController = require('../App/Controllers/UploadsController');

// Route cho việc upload
router.post('/', uploadController.upload);

// Route cho trang chờ và tải xuốnggggg
router.get('/wait', uploadController.wait);
router.get('/wait/download', uploadController.download);
module.exports = router;       