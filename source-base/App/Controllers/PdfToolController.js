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
            console.log("TEMPPPPPPPPPPPPPPPP"+pdfTemp);
        res.redirect(`/pdf-tools/pdf-split/option?pdfFilePath=${pdfFilePath}`);
        });
    }
    pdfOption_Index(req,res){
        // Lấy giá trị của tham số pdfFilePath từ URL query
        const pdfFilePath = req.query.pdfFilePath;
        console.log("OPTION INDEX "+pdfFilePath);
        // Truyền giá trị pdfFilePath vào template khi render
        res.render('pdf-split_option', { pdfFilePath: pdfFilePath });
    }
    pdfSplit_Resolve = async (req, res) => {
        const indexPage = req.body.indexPage;
        const pdfFilePath = pdfTemp; // Sử dụng biến pdfTemp đã lưu từ phương thức pdfOption_Index
        console.log("@@@@@@@@@@@@@@@@@@@@@@@"+pdfFilePath);
        try {
            // Đợi cho việc tải tài liệu PDF hoàn thành
            const pdfData = await fs.readFile(pdfFilePath);
            // Chuyển đổi dữ liệu PDF sang Uint8Array hoặc ArrayBuffer
            const pdfDataArray = new Uint8Array(pdfData);
    
            // Load tài liệu PDF
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
            console.log("Deleted pages:", pagesToDelete);
            res.redirect(`/pdf-tools/pdf-split/download?file=${pdfFilePathWithExtension}`);
        } catch (error) {
            console.error('Error processing PDF:', error);
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
            } else {
                console.log('File downloaded successfully');
            }
        });
    }
}

module.exports = new PdfToolController();
