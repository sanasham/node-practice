const express = require('express');
const users = require('./MOCKDATA.json');
const app = express();
const PORT = 8000;

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.get('/users', (req, res) => {
  const html = `
  <ul>
  ${users.map((x) => `<li key=${x.id}>${x.name}</li>`).join('')}
  </ul>
  `;
  res.send(html);
});

app
  .route('/api/users/:id')
  .get((req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((x) => {
      return x.id === id;
    });
    res.json(user);
  })
  .patch((req, res) => {
    return res.json({ status: 'pending' });
  })
  .delete((req, res) => {
    return res.json({ status: 'pending' });
  });

app.post('/api/users', (req, res) => {
  return res.json({ status: 'pending' });
});

app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
