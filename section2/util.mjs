export const getTodoId = (req) => +req.url.split("/").slice(-1)[0];
export const wait = (timeInMs = 100) =>
  new Promise((resolve) => setTimeout(resolve, timeInMs));
