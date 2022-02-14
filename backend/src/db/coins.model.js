const mongoose = require("mongoose");
const coinsSchema = new mongoose.Schema({
  data: Array,
  status: {
    timestamp: String,
    error_code: Number,
    error_message: Number,
    elapsed: Number,
    credit_count: Number,
  },
});

module.exports = mongoose.model("Coins", coinsSchema);
