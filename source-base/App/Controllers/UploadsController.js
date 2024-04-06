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
                const pagesToDelete = req.body.indexPage.split(',').map(page => parseInt(page.trim()));
            
                // Chuyển đổi chỉ mục của các trang từ 1-indexed sang 0-indexed
                const adjustedIndexes = pagesToDelete.map(pageNumber => pageNumber-1);
            
                // Kiểm tra xem có trang nào nằm ngoài phạm vi không
                if (Math.max(...adjustedIndexes) >= totalPages || Math.min(...adjustedIndexes) < 0) {
                    throw new Error('Chỉ mục trang không hợp lệ');
                }
            
                // Sắp xếp lại các trang theo thứ tự tăng dần để đảm bảo xóa chúng theo đúng thứ tự
                adjustedIndexes.sort((a, b) => a - b);
            




                
                for (const pageNumber of adjustedIndexes) {
                    pdfDoc.removePage(pageNumber);
                    console.log(pageNumber,adjustedIndexes);
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
