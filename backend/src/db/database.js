const mongoose = require("mongoose");

async function connect() {
  const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;
  try {
    const uri = `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;
    await mongoose.connect(uri, {
      dbName: DB_NAME,
    });
  } catch (error) {
    console.error(error);
  }
  return true;
}

module.exports = connect;
