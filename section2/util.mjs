export const getTodoId = (req) => +req.url.split("/").slice(-1)[0];
