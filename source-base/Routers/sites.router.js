const express = require('express');
const router =  express.Router();
const sitesController = require('../App/Controllers/SitesController');
router.use('/post-crud',sitesController.postCRUD)
router.use('/search',sitesController.search)
router.use('/',sitesController.home)
module.exports = router;