const coinMarketClient = require("./coinmarket-client");
const coinsModel = require("./db/coins.model");
const eventBus = require("./event-bus");

module.exports = function () {
  coinMarketClient.getLatestListing().then((data) => {
    new coinsModel(data).save().then(() => {
      eventBus.emit("db:new-coins-data", data);
    });
  });
};
