# IMPORTANT:
npm start 
npm run watch
# Web-Tools-PDF
Node js npm init -y
library PDF npm install @pdf-lib/pdf-lib
express js npm install express multer --save
pythons 
live sever npm install nodemon --save-dev -> 
trong file packed json
nodemon npm i nodemon  --save-dev  ( debug mode )

start script in packet Json use nodemon to debug mode : "start" : "nodemon (--inspector if want debug) serverSide.js", ->> run thi npm start thoi, alway update khong can phai start again server 

morgan ( log ) npm i morgan  --save-dev 
 Template engineer : npm install express-handlebars ( dung de su dung html de dang hon trong node )
# Structor
source-base
├── Assest
    └── PAGES
        └── Views
            └── Layout ( layout main ) link source css js từ public ở đây 
                └── main.handlebars
            ├── home.hbs ( html )
            └── Partials ( layout dung chung ) footer header 
├── Public
     └── CSS
├── Uploads
    ├── PDF

Browser -> Middle ware ( router , dispatcher ) -> Controller -> model, views
serverSide có Router truyền App(expressJs) -> main.router có function chạy các router con ( site router hoặc news router ) -> site router/news router -> controller ( có class function ) -> render/send ra index

Nhớ customine lại structor Theo mô hình MVC theo ý riêng 
FOLDER ghi hoa
File ghi thường
PARTIAL view : thanh phan nho giong footer and header 
Static file
SASS npm install node-sass --save-dev
SCSS file css draw convert into folder public become css {node-sass [options] <input> --output [output]} thay doi trong json script
KHÔNG BAO GIỜ CODE Ở CSS , HÃY VIẾT Ở SCSS VÀ SỬ DỤNG LỆNH NPM RUN WATCH (WATCH TỰ ĐỊNH DẠNG TRONG JSON SCRIPT ) NÓ SẼ TỰ CONVERT SCSS TO CSS, VÌ CSS LÀ VIEW RA, SCSS LÀ DRAW
Vì mặc định là watching extensions: js,mjs,cjs,json chỉ lắng nghe các sự thay đổi từ file trên (nodemon)
khi sử dụng các file css hay scss thì phải config thêm ( ở file nodemon.json)
# FORM GET POST
>> Dùng Query {name}, {method} {action} -> {Dispatcher} -> {Function Handler}

