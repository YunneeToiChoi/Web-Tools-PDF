class UploadsController{
    upload(req, res) {
        const multer = require('multer');
        const path = require('path');
        const uploadsDir = process.env.UPLOADS_DIR || 'Uploads'; // Nếu biến môi trường không được thiết lập, sẽ sử dụng thư mục mặc định là "Uploads"
        // Cấu hình multer để xử lý việc tải lên file PDF và lưu vào thư mục uploads
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, path.join(__dirname, '..', '..', uploadsDir));
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname); // Giữ tên gốc của file
            }
        });
        const upload = multer({ storage: storage });

        // Sử dụng middleware upload để xử lý việc tải lên tệp tin
        upload.single('pdfFile')(req, res, function (err) {
            if (err) {
                // Xảy ra lỗi trong quá trình tải lên
                console.error('Error uploading file:', err);
                return res.status(500).send('Internal Server Error');
            }
            else{
                res.redirect('/upload/processing');
            }
        });
    }
    processing(req, res) {
        res.render('processing')
    }
    deletePages(req, res) {
        const pageNumber = req.body.pageNumber; // Lấy số trang từ yêu cầu
        // Thực hiện xóa trang PDF ở đây, sử dụng pageNumber để xác định trang cần xóa

        // Thông báo cho người dùng biết rằng trang đã được xóa thành công
        res.send(`Page ${pageNumber} has been successfully deleted.`);
    }
}
module.exports = new UploadsController;