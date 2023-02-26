import {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  modifyTodo,
  deleteTodo,
} from "./controller.mjs";

const todosPath = "/todos";
const todoPathRegExp = /^\/todos\/\d+$/;

const router = (req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === todosPath) {
    return getTodos(req, res);
  }
  if (method === "GET" && todoPathRegExp.test(url)) {
    return getTodo(req, res);
  }
  if (method === "POST" && url === todosPath) {
    return createTodo(req, res);
  }
  if (method === "PUT" && todoPathRegExp.test(url)) {
    return updateTodo(req, res);
  }
  if (method === "PATCH" && todoPathRegExp.test(url)) {
    return modifyTodo(req, res);
  }
  if (method === "DELETE" && todoPathRegExp.test(url)) {
    return deleteTodo(req, res);
  }
};

export default router;
