const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const badge = require('./routes/badge.js');
const auth = require('./routes/auth');
const member = require('./routes/member');
const team = require('./routes/team');
const blog = require('./routes/blog');
const event = require('./routes/event');
const project = require('./routes/project');
const announcement = require('./routes/announcement');
const certificate = require('./routes/certificate.js');
const video = require('./routes/video.js');
const achievement = require('./routes/achievement.js');

const cors = require('cors');
const cloudiRouter = require('./routes/member');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

const app = express();

connectDB();

const PORT = process.env.PORT || 5000;
app.use(express.json({ extended: false }));
app.use(cookieParser());
//define routes

app.use(cors());

app.get('/', (req, res) => {
  res.send('Server is running......');
});

app.listen(PORT, () => {
  console.log('Server running on port ', PORT);
});

app.use('/auth', auth);
app.use('/member', member);
app.use('/team', team);
app.use('/blog', blog);
app.use('/event', event);
app.use('/project', project);
app.use('/announcement', announcement);
app.use('/badge', badge);
app.use('/video', video);
app.use('/certificate', certificate);
app.use('/achievement', achievement);

//Cloudinary

app.use(express.static(path.join(__dirname, 'public')));
app.use('/member/profile/addImage', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.headers('Access Controll-Allow-Mthods', 'POST, PUT, GET, DELETE');
    return res.status(200).json({});
  }

  next();
});

app.use((req, res, next) => {
  const error = new Error('NOT FOUND');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
