'use strict';

var express = require('express');
var cors = require('cors');
const multer = require('multer');

var app = express();

// set storage engine
const storage = multer.diskStorage({
	destination: './public/uploads/',			//uploading locally
	filename: function(req, file, cb){
		cb(null, file.fieldname + "-" + Date.now());
	}
})

var upload = multer({ storage: storage });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));


app.post('/api/fileanalyse', upload.single('upfile'), (req, res)=>{
	console.log("At the post request", req.file);
	res.json({ size: req.file.size });
});

app.get('/*', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});