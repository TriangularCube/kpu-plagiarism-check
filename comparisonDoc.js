//This script manually uploads a single file to the MongoDB "fs" collection
//In var docPath = path.join(__dirname, 'testCompare1.docx');, change 'testCompare1.docx' to a different file name
//Make sure you also change the filename it is saved as in var writestream!

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/KPU-PDW', { useNewUrlParser: true });
var conn = mongoose.connection;
var path = require('path');
var Grid = require('gridfs-stream');

var comparisonDoc = require('fs');

//Find the doc to store into DB
var docPath = path.join(__dirname, 'testCompare1.docx');

Grid.mongo = mongoose.mongo;

conn.once('open', function () {
  console.log('- Connection open -');
  var gfs = Grid(conn.db);

  var writestream = gfs.createWriteStream({
    filename: 'testCompare1.docx'
  });

  comparisonDoc.createReadStream(docPath).pipe(writestream);

  writestream.on('close', function (file) {
    console.log(file.filename + 'Written to DB');
  });
});
