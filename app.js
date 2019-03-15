// ------------------------------ app.js ------------------------------


// Require these dependencies ------------------------------


const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const flash = require('flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
//var LocalStrategy = require('Strategy');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');
const crypto = require('crypto');

mongoose.connect('mongodb://localhost/KPU-PDW', { useNewUrlParser: true });
var db = mongoose.connection;﻿

const mongoURI = 'mongodb://localhost/KPU-PDW';
const conn = mongoose.createConnection(mongoURI);


// Initiate gfs and stream ------------------------------


let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
})


// Create storage engine ------------------------------


const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });


// Require routes ------------------------------


var routes = require('./routes/index');
var users = require('./routes/users');


// Initialize Express application ------------------------------


var app = express();


// View engine ------------------------------


app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');


// Middleware ------------------------------


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());


// Set static folder ------------------------------


app.use(express.static(path.join(__dirname, 'public')));


// Express session ------------------------------


app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport Initialize ------------------------------


app.use(passport.initialize());
app.use(passport.session());


// Express vadliator ------------------------------


app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
      var namespace = param.split('.'),
      root = namespace.shift(),
      formParam = root;

      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg : msg,
        value : value
      };
    }
}));


// Connect flash ------------------------------


app.use(flash());


// Set global variables for flash messages ------------------------------


app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', routes);
app.use('/users', users);


// Upload files to DB ------------------------------


app.post('/upload', upload.single('file'), (req, res) => {
  res.redirect('/users/result');
});


// Display all files in DB ------------------------------


app.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    if(!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files detected!'
      });
    }
    return res.json(files);
  });
});

// Set port ------------------------------


app.set('port', (process.env.PORT || 9000));

app.listen(app.get('port'), function(){
    console.log('Server initialized on port ' + app.get('port'));
    console.log('To terminate session, use Ctrl + C')
});


// ------------------------------ END ------------------------------
