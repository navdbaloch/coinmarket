const axios = require("axios");
const coinmarketClient = require("./coinmarket-client");
jest.mock("axios");
test("should fetch data", () => {
  const mockResData = {
    data: [
      {
        id: 1,
      },
    ],
  };
  axios.get.mockResolvedValue(mockResData);

  return coinmarketClient
    .getLatestListing()
    .then((data) => expect(data).toEqual(mockResData.data));
});

test("should handle API error", () => {
  const someerror = "api error";
  axios.get.mockImplementation(() => Promise.reject(someerror));
  return coinmarketClient
    .getLatestListing()
    .catch((error) => expect(error).toEqual(someerror));
});
