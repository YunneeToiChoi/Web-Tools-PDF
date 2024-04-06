const express = require('express');
const router =  express.Router();
const sitesController = require('../App/Controllers/SitesController');

router.use('/search',sitesController.search)
router.use('/',sitesController.home)
module.exports = router;