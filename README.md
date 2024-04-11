# IMPORTANT:
npm start 
npm run watch:sass
npm run build:postcss
npm run build:minify
# Web-Tools-PDF
enviroment  npm install dotenv 
Node js npm init -y
library PDF npm install --save pdf-lib ( document : https://github.com/YunneeToiChoi/pdf-lib/blob/master/README.md ) && (https://pdf-lib.js.org/docs/api/)
express js npm install express multer --save
pythons 
live sever npm install nodemon --save-dev -> 
trong file packed json
nodemon npm i nodemon  --save-dev  ( debug mode )
 Multer npm install multer
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
├── src
    ├── input.css

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

# TailwindCSS - Library 
* Lý do sử dụng tailwind : 
tiết kiệm tài nguyên ( chỉ import những dữ liệu cần dùng thay vì phải import toàn bộ thư viện như bootstrap)
Tuỳ biến cao
hiệu suất cao
- Cấu hình Tailwind:
tailwind.config.js

- Install Tailwind CSS :
>npm install -D tailwindcss
>npx tailwindcss init

- Add the paths to all of your template files in your tailwind.config.js file.
(Định nghĩa đường dẫn cho phép Tailwind truy cập các thẻ html và js trong dự án )
>content: ["./source-base/**/*.{html,js}"],

- Add the @tailwind directives for each of Tailwind’s layers to your main CSS file.
Tạo file nguồn add tài nguyên(input)
>./source-base/src/input.css 

- Run the CLI tool to scan your template files for classes and build your CSS.
Tạo file đích định nghĩa css những class tailwind đã dùng trong dự án thông qua postcss (Command Line Interface -> postcss-cli)
>npx tailwindcss -i ./source-base/src/input.css -o ./source-base/Public/CSS/tailwind.css --watch
./source-base/Public/CSS/tailwind.css ( Định nghĩa trong package json - build:postcss -> npm run build:postcss)

# Tools- postcss
(Tools hỗ trợ tiền xử lý css như sass bao gồm các plugin : postcss-import , tailwindcss/nesting, tailwindcss ,autoprefixer, postcss-preset-env )
- Cấu hình và thiết lập plugin postcss
postcss.config.js

# HOSTING
Render Support : build npm start ( remove nodemon ) and add env packet
# DATABASE
public sever nho doi enviroment
logging : false la kh in ra cau query cua mysql {packed jsosn}

cd [name thu muc] se chuyen toi path cua termnial do
download XAMPP
npm sequelize     npm i sequelize --save
npm sequelize cli  npm install --save-dev sequelize-cli 
Document : https://sequelize.org/docs/v6/other-topics/migrations/
npx sequelize-cli init
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
npm install --save mysql2

npx sequelize-cli db:migrate
npx sequelize-cli seed:generate --name demo-user
npx sequelize-cli db:seed:all