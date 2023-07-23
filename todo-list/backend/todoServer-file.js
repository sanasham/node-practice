const express = require('express');
const fs = require('fs');

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
  fs.readFile('todos.json', 'utf8', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.post('/todos', (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 100000),
    title: req.body.title,
    description: req.body.description,
  };
  console.log('newTodo', newTodo);

  fs.readFile('todos.json', 'utf8', (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    console.log('todos', todos);
    todos.push(newTodo);
    console.log('after push todos', todos);
    console.log('JSON.stringify(todos)', JSON.stringify(todos));
    //note when we try to write, do not pass 'utf8', when we read it, we need 'utf8'
    fs.writeFile('todos.json', JSON.stringify(todos), (err) => {
      if (err) throw err;
      res.status(201).json(newTodo);
    });
  });
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

app.listen('7000', () => {
  console.log('server listening on 7000');
});
