import LikeDb from "./like-db.mjs";
import { ErrorMessage, StatusCode, getJsonHeader, getTodoId } from "./util.mjs";

const db = new LikeDb();

export const getTodos = async (req, res) => {
  const data = await db.getTodos();

  res.writeHeader(StatusCode.OK, getJsonHeader());

  res.end(JSON.stringify({ ok: true, data }));
};

export const getTodo = async (req, res) => {
  let statusCode = StatusCode.NotFound;
  const response = {
    ok: false,
    data: null,
    message: "Todo with given id does not exist.",
  };

  const todoId = getTodoId(req);
  const data = await db.getTodoById(todoId);

  if (data) {
    response.ok = true;
    response.data = data;
    delete response.message;
    statusCode = StatusCode.OK;
  }

  res.writeHeader(statusCode, getJsonHeader());

  res.end(JSON.stringify(response));
};

export const createTodo = async (req, res) => {
  let statusCode = StatusCode.BadRequest;
  const response = {
    ok: true,
    data: null,
    message: ErrorMessage.NotValid,
  };

  const { text } = req.body;
  if (text != null) {
    response.data = await db.insertTodo({ text, done: false });
    response.ok = true;
    delete response.message;
    statusCode = StatusCode.Created;
  }

  res.writeHeader(statusCode, getJsonHeader());
  res.end(JSON.stringify(response));
};

export const updateTodo = async (req, res) => {
  let statusCode = StatusCode.BadRequest;
  const response = {
    ok: false,
    data: null,
    message: ErrorMessage.NotValid,
  };

  const todoId = getTodoId(req);

  const { text, done } = req.body;
  if (text != null && req != null) {
    statusCode = StatusCode.NotFound;
    response.message = ErrorMessage.NotExist;

    response.data = await db.updateTodo(todoId, { text, done });
  }

  if (response.data) {
    statusCode = StatusCode.OK;
    delete response.message;
    response.ok = true;
  }

  res.writeHeader(statusCode, getJsonHeader());
  res.end(JSON.stringify(response));
};

export const modifyTodo = async (req, res) => {
  let statusCode = StatusCode.BadRequest;
  const response = {
    ok: false,
    data: null,
    message: ErrorMessage.NotValid,
  };

  const todoId = getTodoId(req);

  const { text, done } = req.body;
  if (text != null || done != null) {
    statusCode = StatusCode.NotFound;
    response.message = ErrorMessage.NotExist;
    const modifyingFields = {
      ...(text != null && { text }),
      ...(done != null && { done }),
    };
    response.data = await db.updateTodo(todoId, modifyingFields);
  }

  console.log(response.data);

  if (response.data) {
    statusCode = StatusCode.OK;
    delete response.message;
    response.ok = true;
  }

  res.writeHeader(statusCode, getJsonHeader());
  res.end(JSON.stringify(response));
};

export const deleteTodo = async (req, res) => {
  let statusCode = StatusCode.NotFound;
  const response = {
    ok: false,
    data: null,
    message: ErrorMessage.NotExist,
  };

  const todoId = getTodoId(req);
  response.data = await db.delete(todoId);

  if (response.data) {
    response.ok = true;
    delete response.message;
    statusCode = StatusCode.OK;
  }

  res.writeHeader(statusCode, getJsonHeader());
  res.end(JSON.stringify(response));
};
