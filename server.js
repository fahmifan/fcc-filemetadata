'use strict';

var express = require('express');
var cors = require('cors');
const multer = require('multer');
const upload = multer()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res, next) => {
  console.log("file: ", req.file);
  if(!req.file) {
    res.status(400).json({"error": "no file uploaded"})
    return
  }

  res
    .status(200)
    .json({
      "name": req.file.originalname,
      "type": req.file.mimetype,
      "size": req.file.size,
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, function () {
  console.log(`Node.js listening on :${PORT}`);
});
