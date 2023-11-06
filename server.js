const express = require("express");
const jsonServer = require("json-server");
const server = express();
const path = require("path");
const router = jsonServer.router(path.join("/data", "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use("/api", router);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
