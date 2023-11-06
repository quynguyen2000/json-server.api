const express = require("express");
const jsonServer = require("json-server");
const server = express();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const fs = require("fs");

server.use(middlewares);

server.use("/api", router);

const dataFilePath = "./db.json";
const backupFilePath = "./db_backup.json";

function backupData() {
  if (!fs.existsSync(backupFilePath)) {
    fs.copyFileSync(dataFilePath, backupFilePath);
    console.log("Data backup created.");
  } else {
    const db_backup_buff = fs.readFileSync(backupFilePath, "utf8");
    const db_buff = fs.readFileSync(dataFilePath, "utf8");
    const db_backup = JSON.parse(db_backup_buff);
    const db = JSON.parse(db_buff);
    const mergedData = {
      users: [...db_backup.users, ...db.users],
      products: [...db_backup.products, ...db.products],
      cart_item: [...db_backup.cart_item, ...db.cart_item],
      orders: [...db_backup.orders, ...db.orders],
      carts: [...db_backup.carts, ...db.carts],
    };
    const mergedDataJson = JSON.stringify(mergedData, null, 2);
    fs.writeFileSync(backupFilePath, mergedDataJson);
    console.log("merge backup created.");
  }
}

backupData();
router.db.setState = (state) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(state));
  router.db.__wrapped__ = state;
};

server.on("close", () => {
  backupData();
});

const port = process.env.PORT || 5001;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
