import http from "http";

const todos = [
  { id: 1, text: "Wake up", isDone: false },
  { id: 2, text: "To buy milk", isDone: true },
  { id: 3, text: "Cook breakfast", isDone: true },
];

const server = http.createServer((req, res) => {
  // const { headers, url, method } = req;
  // console.log({ headers, url, method });

  // res.setHeader("X-Powered-By", "Nodejs");
  // res.setHeader("Content-Type", "text/html");
  // res.setHeader("Content-Type", "application/json");
  // res.statusCode = 404;

  // res.write("<h1>Hello</h1>");
  // res.write("<p>Hello again</p>");

  // You can also set using the following method
  res.setHeader(
    "Access-Control-Allow-Origin",
    "*"
  ); /* @dev First, read about security */
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  res.setHeader("Access-Control-Max-Age", 2592000); // 30 days

  res.writeHead(404, {
    "X-Powered-By": "Nodejs",
    "Content-Type": "text/html",
    "Content-Type": "application/json",
  });
  res.end(JSON.stringify({ success: false, data: todos }));
});

server.listen(3000, () => console.log("Server is running on port 3000"));
