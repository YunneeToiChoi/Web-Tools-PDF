const express = require('express');
const path = require('path');
const multer = require('multer'); // Để xử lý upload file

const app = express();
const port = 3000; // Cổng mà máy chủ sẽ lắng nghe

// Thiết lập đường dẫn cho các thư mục tĩnh
app.use(express.static(path.join(__dirname, 'FE')));

// Thiết lập multer để xử lý việc tải lên file PDF và lưu vào thư mục uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads')); // Sử dụng đường dẫn tương đối từ thư mục dự án
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Giữ tên gốc của file
  }
});
const upload = multer({ storage: storage });

// Xử lý yêu cầu GET đến đường dẫn gốc
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'source-base', 'homePage.html'));
});

// Xử lý yêu cầu POST để tải lên file PDF
app.post('/upload', upload.single('pdfFile'), (req, res) => {
  // Xử lý logic tải lên file PDF ở đây
  res.send('File PDF đã được tải lên thành công và lưu vào thư mục uploads.');
});

// Khởi động máy chủ
app.listen(port, () => {
  console.log(`Máy chủ đang lắng nghe trên cổng ${port}`);
});
