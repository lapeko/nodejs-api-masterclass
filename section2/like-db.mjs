import { wait } from "./util.mjs";

const todos = [
  { id: 1, text: "buy milk", done: true },
  { id: 2, text: "wash the dishes", done: false },
  { id: 3, text: "clean up my flat", done: true },
];
const getLowestFreeId = () => (todos.at(-1)?.id || 0) + 1;

export default class LikeDb {
  static #instance;

  constructor() {
    if (!LikeDb.#instance) LikeDb.#instance = this;
    return LikeDb.#instance;
  }

  async getTodos() {
    await wait();
    return todos;
  }

  async getTodoById(id) {
    await wait();
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) return null;
    return todos[index];
  }

  async insertTodo(todo) {
    await wait();
    todos.push({ id: getLowestFreeId(), ...todo });
    return todos;
  }

  async updateTodo(id, todo) {
    await wait();
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) return null;
    todos[index] = { ...todos[index], ...todo };
    return todos;
  }

  async delete(id) {
    await wait();
    const index = todos.findIndex((todo) => todo.id === id);
    if (index === -1) return null;
    todos.splice(index, 1);
    return todos;
  }
}
