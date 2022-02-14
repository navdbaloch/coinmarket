require("dotenv").config();

const express = require("express");
const app = express();
const port = 3000;
const cron = require("node-cron");
const fetchData = require("./src/coinmarket-api");
const coinsModel = require("./src/db/coins.model");
const dbConnect = require("./src/db/database");

(async () => {
  await dbConnect();
})();

app.get("/", async (req, res) => {
  const latestRecord = await coinsModel
    .findOne()
    .sort({ "status.timestamp": -1 })
    .exec();
  res.send(latestRecord);
});

cron.schedule("*/5 * * * *", function () {
  fetchData().then((data) => {
    new coinsModel(data).save().then(() => {
      console.log("new record has been added");
    });
  });
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
