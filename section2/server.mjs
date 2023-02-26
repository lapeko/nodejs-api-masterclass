import http from "http";
import router from "./router.mjs";

const serverCallback = (req, res) => {
  const chunks = [];
  req
    .on("data", (chunk) => {
      chunks.push(chunk);
    })
    .on("end", () => {
      const body = chunks.length ? JSON.parse(chunks.toString()) : {};
      req.body = body;
      router(req, res);
    });
};

const server = http.createServer(serverCallback);

server.listen(3000, () => console.log("server is running on port 3000"));
