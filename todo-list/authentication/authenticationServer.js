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
const userAuthentication = (req, res, next) => {
  const { username, password } = req.headers;

  const user = USERS.find(
    (a) => a.username === username && a.password === password
  );

  if (!user) {
    res.status(403).json({ message: 'user Authentication failed' });
  } else {
    req.user = user;
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

app.post('/admin/courses', adminAuthentication, (req, res) => {
  const course = req.body;

  if (course.title) {
    course.id = Date.now();
    COURCES.push(course);
    res.json({ message: 'Course created successfully', courseId: course.id });
  } else {
    res.status(403).json({ message: 'Course was not created' });
  }
});

app.put('/admin/courses/:id', adminAuthentication, (req, res) => {
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

app.post('/user/signup', (req, res) => {
  const user = { ...req.body, purchasedCourses: [] };
  const existingUser = USERS.find((a) => a.username === user.username);
  console.log(existingUser);
  if (!existingUser) {
    USERS.push(user);
    res.json({ message: 'user created successfully', user: USERS });
  } else {
    res.status(403).json({ message: 'user already exists' });
  }
  res.json({ message: 'Admin created successfully', token: 'jwt_token_here' });
});

app.post('/user/login', userAuthentication, (req, res) => {
  res.json({ message: 'user Logged in successfully', token: 'jwt_token_here' });
});

app.get('/user/courses', userAuthentication, (req, res) => {
  res.json({ courses: COURCES.filter((c) => c.published) });
});

app.listen(5000, () => {
  console.log('server listening on port 5000');
});
