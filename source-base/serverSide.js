// LIBRARIES BASE
require('dotenv').config();
const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const connectDB = require('./config/connectDB');
// LIBRARIES SUPPORTED
const morgan = require('morgan'); // log 
const  { engine  }  = require('express-handlebars'); //structor file
//CALL BASE
const route = require('./Routers/main.router')
//RUNNING SERVER SIDE 
const app = express();
//middle ware
app.use(express.urlencoded({
  extends: true
})) // middleware
app.use(express.json()) // middleware client -> server 
connectDB();
/////
//HTTP LOGGER
app.use(morgan('combined'));
// TEMPLATE ENGINE
app.use(express.static(path.join(__dirname, 'Public'))); //static file 
app.engine('hbs', engine({
  extname: '.hbs' // set engine cho file
}));
app.set('view engine', 'hbs'); // ref 2 là name của thư viện đc gán tên, cũng là đuôi file
app.set('views', path.join(__dirname, 'Assest/PAGES/views'));

 // pointer default path file html
// END TEMPLATE ENGINEEE

//Route
route(app)
// Khởi động máy chủ
app.listen(port, () => console.log(`Máy chủ đang lắng nghe trên cổng ${port}`));
