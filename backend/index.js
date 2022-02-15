require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cron = require("node-cron");
const coinsModel = require("./src/db/coins.model");
const dbConnect = require("./src/db/database");
const populateCoinsData = require("./src/populate-coins-data");
const eventBus = require("./src/event-bus");

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = new Server(server);

function getLatestDataRow() {
  return coinsModel.findOne().sort({ "status.timestamp": -1 }).exec();
}

// Add a record in database on first startup
(async () => {
  await dbConnect();
  const row = await getLatestDataRow();
  if (!row) {
    populateCoinsData();
  }
})();


app.get("/get-latest-data", async (req, res) => {
  res.send(await getLatestDataRow());
});

// Runs every 5 minutes to populate database from API
cron.schedule("*/5 * * * *", populateCoinsData);

// send new data to all connected clients
eventBus.on("db:new-coins-data", (data) => {
  io.emit("data", data);
});

server.listen(port, () => {
  console.log("listening on *:3000");
});
