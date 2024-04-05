// LIBRARIES BASE
const express = require('express');
const path = require('path');
const port = 3000; // Cổng mà máy chủ sẽ lắng nghe
// LIBRARIES SUPPORTED
const morgan = require('morgan'); // log 
const  { engine  }  = require('express-handlebars'); //structor file
//RUNNING SERVER SIDE 
const app = express();
//HTTP LOGGER
app.use(morgan('combined'));
// TEMPLATE ENGINE
app.use(express.static(path.join(__dirname, 'Public'))); //static file 
app.engine('hbs', engine({
  extname: '.hbs' // set engine cho file
}));
app.set('view engine', 'hbs'); // ref 2 là name của thư viện đc gán tên, cũng là đuôi file
app.set('views',path.join(__dirname, 'ASSEST/PAGES/Views')); // pointer default path file html
// END TEMPLATE ENGINE

app.get('/', (req, res) => {
  res.render('home')
});
// Khởi động máy chủ
app.listen(port, () => console.log(`Máy chủ đang lắng nghe trên cổng ${port}`));
