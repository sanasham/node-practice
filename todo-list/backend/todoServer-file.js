const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
let todos = [];

function findIndex(arr, id) {
  for (let i = 0; i < arr.length; i++) {
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
app.use(cors());

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

    todos.push(newTodo);
    //note when we try to write, do not pass 'utf8', when we read it, we need 'utf8'
    fs.writeFile('todos.json', JSON.stringify(todos), (err) => {
      if (err) throw err;
      res.status(201).json(newTodo);
    });
  });
});

app.put('/todos/:id', (req, res) => {
  fs.readFile('todos.json', 'utf8', (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    console.log('read file todos:', todos);
    const todoIndex = findIndex(todos, parseInt(req.params.id));
    console.log('todo index', todoIndex);
    if (todoIndex === -1) {
      res.status(400).send();
    } else {
      todos[todoIndex].title = req.body.title;
      todos[todoIndex].description = req.body.description;
      fs.writeFile('todos.json', JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.json(todos[todoIndex]);
      });
    }
  });
});
app.delete('/todos/:id', (req, res) => {
  fs.readFile('todos.json', 'utf8', (err, data) => {
    if (err) throw err;
    const olTodos = JSON.parse(data);
    const todoIndex = findIndex(olTodos, parseInt(req.params.id));
    if (todoIndex === -1) {
      res.status(400).send();
    } else {
      let todos = removeAtIndex(olTodos, todoIndex);
      fs.writeFile('todos.json', JSON.stringify(todos), (err) => {
        if (err) throw err;
        res.status(200).json();
      });
    }
  });
});

app.listen('7000', () => {
  console.log('server listening on 7000');
});
