const express = require('express');
const app = express();

//Use express static to serve static files
//such as images, CSS files, and JavaScript files
//You can use the express.static middleware to access files from this folder
//This line is necessary for serve images
app.use(express.static(__dirname));

//route to the Homepage
app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/index.html');
})

//route to css
app.get('/css', (req, res)=>{
  res.sendFile(__dirname + '/books.css');
})
//route to books.js
app.get('/storejs', (req, res)=>{
  res.sendFile(__dirname + '/books.js');
})
//add route to products.json
app.get('/products', (req, res)=>{
  res.sendFile(__dirname + '/products.json');
})

const port = 3000;
app.listen(port, ()=> console.log(`This app is listening on port ${port}`));
