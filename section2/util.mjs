export const ErrorMessage = {
  NotExist: "Todo with given id does not exist.",
  NotValid: "Todo validation error.",
};

export const StatusCode = {
  OK: 200,
  Created: 201,
  BadRequest: 400,
  NotFound: 404,
};

export const getTodoId = (req) => +req.url.split("/").at(-1);

export const wait = (timeInMs = 100) =>
  new Promise((resolve) => setTimeout(resolve, timeInMs));

export const getJsonHeader = () => ({ "Content-Type": "application/json" });
