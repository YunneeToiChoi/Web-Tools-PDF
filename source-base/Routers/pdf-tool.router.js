const express = require('express'); 
const router = express.Router();
const pdfToolController = require('../App/Controllers/PdfToolController');

router.use('/pdf-split/option',pdfToolController.pdfOption_Index)
router.use('/pdf-split/upload',pdfToolController.pdfUpload)
router.use('/pdf-split/resolve',pdfToolController.pdfSplit_Resolve)
router.use('/pdf-split/download/agree',pdfToolController.pdfSplit_SessionDownload)
router.use('/pdf-split/download',pdfToolController.pdfSplit_Download)
router.use('/pdf-split',pdfToolController.pdfSplit)
router.use('/pdf-preview-all-pages',pdfToolController.pdfPreview)
router.use('/',pdfToolController.pdfList)


module.exports = router;
