

const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const fs = require('fs').promises;

async function cutPDFPages(inputPath, outputPath, startPage, endPage) {
    const pdfBytes = await fs.readFile(inputPath);
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const pages = pdfDoc.getPages();

    // Kiểm tra startPage và endPage hợp lệ
    if (startPage < 0 || endPage >= pages.length || startPage > endPage) {
        throw new Error('Trang không hợp lệ');
    }

    // Tạo một PDF mới chứa các trang được cắt
    const newPdf = await PDFDocument.create();
    for (let i = startPage; i <= endPage; i++) {
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
        newPdf.addPage(copiedPage);
    }

    // Ghi PDF mới vào tệp đích
    const newPdfBytes = await newPdf.save();
    await fs.writeFile(outputPath, newPdfBytes);
}

// Sử dụng hàm cutPDFPages
const inputPath = 'đường_dẫn_đến_file_input.pdf';
const outputPath = 'đường_dẫn_đến_file_output.pdf';
const startPage = 1;
const endPage = 3;

cutPDFPages(inputPath, outputPath, startPage, endPage)
    .then(() => console.log('Đã cắt trang PDF thành công'))
    .catch(error => console.error('Lỗi khi cắt trang PDF:', error));
