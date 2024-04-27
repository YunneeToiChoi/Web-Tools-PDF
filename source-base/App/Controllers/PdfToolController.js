    const { PDFDocument } = require('pdf-lib');
    const fs = require('fs').promises;
    const path = require('path');
    const multer = require('multer');
    class PdfToolController {
        pdfList(req,res) {
            res.render('pdf-tools');
        }
        pdfSplit(req,res) {
            res.render('pdf-split');
        }
        async pdfUpload(req, res) {
            console.log(req.body)
            try {
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
                    // res.redirect(`/pdf-tools/pdf-split/option?pdfFilePath=${pdfFilePath}`);
                    return res.status(200).json({ pdfFilePath });
                });
            } catch (error) {
                console.error('Error uploading file:', error);
                return res.status(500).send('Internal Server Error');
            }
        }
        pdfOption_Index(req, res){
            const pdfFilePath = req.query.pdfFilePath;
            res.render('pdf-split_option', {pdfFilePath});
        }
        async pdfSplit_Resolve (req, res) {
            try {
            const indexPageBasic = req.body.indexPageBasic;
            const indexPageSmart = req.body.indexPageSmart;
            const pdfFilePath = req.body.filePath;
            console.log(indexPageBasic , ' +    ',indexPageSmart )
            const pagesToDelete = parseInput(indexPageBasic, indexPageSmart);
            console.log(pagesToDelete)
                const pdfData = await fs.readFile(pdfFilePath);
                const pdfDataArray = new Uint8Array(pdfData);
                const pdfDoc = await PDFDocument.load(pdfDataArray);
                const totalPages = pdfDoc.getPageCount();
                if (pagesToDelete.some(pageNumber => pageNumber < 0 || pageNumber >= totalPages)) {
                    res.status(`Invalid page index. Please provide page indices within our format or range 0 to ${totalPages}`)
                }
                pagesToDelete.sort((a, b) => a - b);
                console.log(pagesToDelete)
        
                for (let i = pagesToDelete.length - 1; i >= 0; i--) {
                    pdfDoc.removePage(pagesToDelete[i]);
                }

                
                const modifiedPdfBytes = await pdfDoc.save();
                const pdfFileName = path.basename(pdfFilePath);
                const pdfFilePathWithExtension = pdfFileName.endsWith('.pdf') ? pdfFilePath : `${pdfFilePath}.pdf`;
        
                await fs.writeFile(pdfFilePathWithExtension, modifiedPdfBytes);
                res.redirect(`/pdf-tools/pdf-split/download?file=${pdfFilePathWithExtension}`);
                // res.status(200).json({pdfFilePathWithExtension});
            } catch (error) {
                return res.status(500).send(error.message);
            }
        }
        pdfSplit_Download(req,res) {
            const pdfFilePathWithExtension = req.query.file;
            res.status(200).json(pdfFilePathWithExtension);
            // res.render('downloadPage', { pdfFilePathWithExtension });
        }
        pdfSplit_SessionDownload(req, res) {
            const pdfFilePathWithExtension = req.body.filePath;
            res.download(pdfFilePathWithExtension, (err) => {
                if (err) {
                    console.error('Error downloading file:', err);
                    return res.status(500).send('Error downloading file');
                }
            });
        }
        async pdfPreview(req, res) {
            try {
                const pdfFilePath = req.query.pdfFilePath;
        
                // Read the PDF file
                const pdfData = await fs.readFile(pdfFilePath);
                const pdfDataArray = new Uint8Array(pdfData);
        
                // Load the PDF document
                const pdfDoc = await PDFDocument.load(pdfDataArray);
        
                const pageCount = pdfDoc.getPageCount();
        
                // Extract page content
                const allPagesContent = [];
                for (let i = 0; i < pageCount; i++) {
                    const page = await pdfDoc.getPage(i); // Page numbers start from 1
                    const content = await page.getTextContent(); // Extract text content of page
                    allPagesContent.push(content.items.map(item => item.str).join('')); // Extract text items and concatenate them
                }
                console.log("Preview is running: " + pdfFilePath);
        
                // Send page count and page content in the response
                res.status(200).json({ pageCount, pagesContent: allPagesContent });
            } catch (error) {
                console.error("Error loading PDF:", error);
                res.status(500).json({ error: "Error loading PDF" });
            }
        }
    }
    function parseInput(inputBasic, inputSmart) {
        const result = new Set();

        if (inputBasic) {
            const pagesToDelete = inputBasic.split(',').map(value => parseInt(value.trim()) - 1);
            for (let i = pagesToDelete.length - 1; i >= 0; i--) {
                const pageIndex = pagesToDelete[i];
                if (!isNaN(pageIndex) && pageIndex >= 0) {
                    result.add(pageIndex);
                }
            }
        }

        if (inputSmart) {
            const [start, end] = inputSmart.split('=>').map(value => parseInt(value.trim()) - 1);
            if (!isNaN(start) && !isNaN(end) && start <= end) {
                for (let i = start; i <= end; i++) {
                    result.add(i);
                }
            }
        }

        return Array.from(result);
    }


    module.exports = new PdfToolController();