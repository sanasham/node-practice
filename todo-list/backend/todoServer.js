const express = require('express');

const app = express();
let todos = [];

function findIndex(arr, id) {
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i].id === id) {
      return i;
    }
  }
  return -1;
}

function removeAtIndex(arr, index) {
  let newArray = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (i !== index) {
      newArray.push(arr[i]);
    }
  }
  return newArray;
}

app.use(express.json());
app.get('/todos', (req, res) => {
  res.json(todos);
});

app.post('/todos', (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 100000),
    title: req.body.title,
    description: req.body.description,
  };
  todos.push(newTodo);
  res.status(200).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const todoIndex = findIndex(todos, parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(400).send();
  } else {
    todos[todoIndex].title = req.body.title;
    todos[todoIndex].description = req.body.description;
    res.json(todos[todoIndex]);
  }
});
app.delete('/todos/:id', (req, res) => {
  const todoIndex = findIndex(todos, parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(400).send();
  } else {
    todos = removeAtIndex(todos, todoIndex);
    res.status(200).send();
  }
});

app.listen('8000', () => {
  console.log('server listening on 8000');
});
