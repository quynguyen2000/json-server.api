const fs = require("fs");
const backupFilePath = "./db_backup.json";

fs.copyFileSync("./db.json", backupFilePath);

const jsonDb = "./db.json";
export function restoreData() {
  if (fs.existsSync(backupFilePath)) {
    fs.copyFileSync(backupFilePath, "./db.json");
    console.log("Data restored from backup.");
  } else {
    console.log("No backup file found.");
  }
}
