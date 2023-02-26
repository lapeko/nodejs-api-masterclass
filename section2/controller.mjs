import { todos } from "./data.mjs";
import { getTodoId } from "./util.mjs";

export const getTodos = (req, res) => {
  res.writeHeader(200, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(todos));
};

export const getTodo = (req, res) => {
  const todoId = getTodoId(req);
  res.writeHeader(200, {
    "Content-Type": "application/json",
  });

  res.end(JSON.stringify(todos.filter((todo) => todo.id === todoId)[0]));
};

export const createTodo = (req, res) => {
  todos.push(req.body);
  res.writeHeader(201, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(todos));
};

export const updateTodo = (req, res) => {
  const todoId = getTodoId(req);
  const index = todos.findIndex((todo) => todoId === todo.id);
  todos[index] = req.body;
  res.writeHeader(200, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(todos));
};

export const modifyTodo = (req, res) => {
  const todoId = getTodoId(req);
  const index = todos.findIndex((todo) => todoId === todo.id);
  todos[index] = { ...todos[index], ...req.body };
  res.writeHeader(200, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(todos));
};

export const deleteTodo = () => {
  const todoId = getTodoId(req);
  const index = todos.findIndex((todo) => todoId === todo.id);
  todos.splice(index, 1);
  res.writeHeader(200, {
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify(todos));
};
