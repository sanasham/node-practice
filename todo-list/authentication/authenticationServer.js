const express = require('express');
const userRoute = require('./authRoutes.js');
const app = express();
app.use(express.json());
app.use('/user', userRoute);
app.listen(5000, () => {
  console.log('server listening on port 5000');
});
