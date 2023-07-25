const userInfo = (req, res) => {
  res.send('user route is displaying data from controller');
};
const userSignup = (req, res) => {
  res.send('user route is signup');
};
const userLogin = (req, res) => {
  res.send('user route for login');
};

module.exports = { userInfo, userSignup, userLogin };
