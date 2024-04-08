const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
class UploadsController {
    upload(req, res) {
        const upload = multer({
            dest: 'source-base/Uploads/',
            fileFilter: function (req, file, cb) {
                if (file.originalname.endsWith('.pdf')) {
                    cb(null, true);
                } else {
                    cb(new Error('Only PDF files are allowed!'));
                }
            }
        }).single('pdfFile');
    
        upload(req, res, async function (err) {
            if (err) {
                console.error('Error uploading file:', err);
                return res.status(500).send('Internal Server Error');
            }
        
            const pdfFilePath = req.file.path;
        
            try {
                const pdfDoc = await PDFDocument.load(await fs.readFile(pdfFilePath));
                const totalPages = pdfDoc.getPageCount();
                const pagesToDelete = req.body.indexPage.split(',').map(page => parseInt(page.trim()) - 1); // Chuyển đổi chỉ mục từ 1-indexed sang 0-indexed và lưu vào mảng
        
                // Kiểm tra xem có trang nào nằm ngoài phạm vi không
                if (pagesToDelete.some(pageNumber => pageNumber < 0 || pageNumber >= totalPages)) {
                    throw new Error('Chỉ mục trang không hợp lệ');
                }
        
                // Sắp xếp lại các chỉ mục trang để đảm bảo xóa chúng theo đúng thứ tự
                pagesToDelete.sort((a, b) => a - b);
        
                // Xóa các trang từ tài liệu PDF
                for (let i = pagesToDelete.length - 1; i >= 0; i--) { // Lặp từ cuối mảng để tránh xóa sai trang do thay đổi chỉ mục
                    pdfDoc.removePage(pagesToDelete[i]);
                }
        
                const modifiedPdfBytes = await pdfDoc.save();
                const pdfFileName = path.basename(pdfFilePath);
                const pdfFilePathWithExtension = pdfFileName.endsWith('.pdf') ? pdfFilePath : `${pdfFilePath}.pdf`;
        
                await fs.writeFile(pdfFilePathWithExtension, modifiedPdfBytes);
        
                console.log("Deleted pages:", pagesToDelete);
        
                res.redirect(`/upload/wait/?file=${pdfFilePathWithExtension}`);
            } catch (error) {
                console.error('Error processing PDF:', error);
                return res.status(500).send(error.message); // Trả về thông báo lỗi cho người dùng
            }
        });
        
    }
    wait(req, res) {
        const pdfFilePathWithExtension = req.query.file;
        res.render('downloadPage', { pdfFilePathWithExtension });
    }
    download(req, res) {
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
module.exports = new UploadsController();
