const express = require('express');
// const userRoute = require('./authRoutes.js');
const app = express();
app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURCES = [];

const adminAuthentication = (req, res, next) => {
  const { username, password } = req.headers;
  console.log('ADMINS', ADMINS);
  console.log('username', username);
  const admin = ADMINS.find(
    (a) => a.username === username && a.password === password
  );
  console.log(admin);
  if (!admin) {
    res.status(403).json({ message: 'Admin Authentication failed' });
  } else {
    next();
  }
};

app.post('/admin/signup', (req, res, next) => {
  const { username, password } = req.body;
  const existingAdmin = ADMINS.find((a) => a.username === username);
  if (!existingAdmin) {
    ADMINS.push({ username, password });
    res.json({ message: 'Admin created successfully' });
  } else {
    res.status(403).json({ message: 'Admin already exists' });
  }
  res.json({ message: 'Admin created successfully', token: 'jwt_token_here' });
});

app.post('/admin/login', adminAuthentication, (req, res, next) => {
  res.json({ message: 'Logged in successfully', token: 'jwt_token_here' });
});

app.post('/admin/courses', adminAuthentication, (req, res, next) => {
  const course = req.body;
  console.log('course', course);
  console.log('check_token', !course.title);
  if (course.title) {
    course.id = Date.now();
    COURCES.push(course);
    console.log('COURCES', COURCES);
    res.json({ message: 'Course created successfully', courseId: course.id });
  } else {
    res.status(403).json({ message: 'Course was not created' });
  }
});

app.put('/admin/courses:id', (req, res, next) => {
  res.json({ message: 'Logged in successfully', token: 'jwt_token_here' });
});

app.get('/admin/courses', (req, res, next) => {
  res.json({
    courses: [
      {
        id: 1,
        title: 'course title',
        description: 'course description',
        price: 100,
        imageLink: 'https://linktoimage.com',
        published: true,
      },
    ],
  });
});

app.listen(5000, () => {
  console.log('server listening on port 5000');
});
