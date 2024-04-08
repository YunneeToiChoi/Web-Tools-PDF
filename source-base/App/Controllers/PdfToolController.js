const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
var pdfTemp = '';
class PdfToolController {
    pdfList(req,res) {
        res.render('pdf-tools');
    }
    pdfSplit(req,res) {
        res.render('pdf-split');
    }
    pdfUpload(req, res) {
        const upload = multer({
            dest: 'source-base/Uploads/',
            fileFilter: function (req, file, cb) {
                if (file.originalname.endsWith('.pdf')) {
                    cb(null, true);
                } else {
                    cb(new Error('Only PDF files are allowed!'));
                }
            }
        }).single('pdfFilePath');
        upload(req, res, async function (err) {
            if (err) {
                console.error('Error uploading file:', err);
                return res.status(500).send('Internal Server Error');
            }   
            const pdfFilePath = req.file.path;
            pdfTemp = pdfFilePath;
        res.redirect(`/pdf-tools/pdf-split/option?pdfFilePath=${pdfFilePath}`);
        });
    }
    pdfOption_Index(req,res){
        const pdfFilePath = req.query.pdfFilePath;
        res.render('pdf-split_option', {pdfFilePath});
    }
    pdfSplit_Resolve = async (req, res) => {
        const indexPage = req.body.indexPage;
        const pdfFilePath = pdfTemp;
        try {
            const pdfData = await fs.readFile(pdfFilePath);
            const pdfDataArray = new Uint8Array(pdfData);
            const pdfDoc = await PDFDocument.load(pdfDataArray);
            const totalPages = pdfDoc.getPageCount();
            const pagesToDelete = indexPage.split(',').map(page => parseInt(page.trim()) - 1);
    
            if (pagesToDelete.some(pageNumber => pageNumber < 0 || pageNumber >= totalPages)) {
                throw new Error('Chỉ mục trang không hợp lệ');
            }
    
            pagesToDelete.sort((a, b) => a - b);
    
            for (let i = pagesToDelete.length - 1; i >= 0; i--) {
                pdfDoc.removePage(pagesToDelete[i]);
            }
    
            const modifiedPdfBytes = await pdfDoc.save();
            const pdfFileName = path.basename(pdfFilePath);
            const pdfFilePathWithExtension = pdfFileName.endsWith('.pdf') ? pdfFilePath : `${pdfFilePath}.pdf`;
    
            await fs.writeFile(pdfFilePathWithExtension, modifiedPdfBytes);
            res.redirect(`/pdf-tools/pdf-split/download?file=${pdfFilePathWithExtension}`);
        } catch (error) {
            return res.status(500).send(error.message);
        }
    }
    pdfSplit_Download(req,res) {
        const pdfFilePathWithExtension = req.query.file;
        res.render('downloadPage', { pdfFilePathWithExtension });
    }
    pdfSplit_SessionDownload(req,res){
        const pdfFilePathWithExtension = req.query.file;    
        res.download(pdfFilePathWithExtension, (err) => {
            if (err) {
                console.error('Error downloading file:', err);
                return res.status(500).send('Error downloading file');
            }
        });
    }
}

module.exports = new PdfToolController();