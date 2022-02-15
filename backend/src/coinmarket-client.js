const axios = require("axios");

function getLatestListing() {
  return new Promise(async (resolve, reject) => {
    let response = null;
    try {
      response = await axios.get(
        `${process.env.COIN_MARKET_ENV}v1/cryptocurrency/listings/latest?sort=market_cap&limit=100`,
        {
          headers: {
            "X-CMC_PRO_API_KEY": process.env.COIN_MARKET_SECRET_KEY,
          },
        }
      );
    } catch (ex) {
      reject(ex);
    }
    if (response) {
      const json = response.data;
      resolve(json);
    }
  });
}
module.exports = {
  getLatestListing,
};
