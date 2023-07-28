const express = require('express');
// const userRoute = require('./authRoutes.js');
const app = express();
app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURCES = [];

const adminAuthentication = (req, res, next) => {
  const { username, password } = req.headers;

  const admin = ADMINS.find(
    (a) => a.username === username && a.password === password
  );

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

  console.log('check_token', !course.title);
  if (course.title) {
    course.id = Date.now();
    COURCES.push(course);
    res.json({ message: 'Course created successfully', courseId: course.id });
  } else {
    res.status(403).json({ message: 'Course was not created' });
  }
});

app.put('/admin/courses:id', adminAuthentication, (req, res) => {
  const courseId = Number(req.params.id);
  console.log(courseId);
  const course = COURCES.find((a) => a.id === courseId);
  if (course) {
    Object.assign(course, req.body);
    res.json({ message: 'Course updated successfully' });
  } else {
    res.status(404).json({ message: 'Course not fond' });
  }
});

app.get('/admin/courses', adminAuthentication, (req, res) => {
  res.json({
    courses: COURCES,
  });
});

app.listen(5000, () => {
  console.log('server listening on port 5000');
});
