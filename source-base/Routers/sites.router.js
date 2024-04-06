const express = require('express');
const router =  express.Router();
const sitesController = require('../App/Controllers/Sites.Controller');

// router.use('/:slug',newsController.show)
router.use('/search',sitesController.search)
router.use('/',sitesController.home)
module.exports = router;