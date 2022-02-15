const mongoose = require("mongoose");
const databaseConnect = require("./database");
jest.mock("mongoose");
test("should connect", () => {
  mongoose.connect.mockResolvedValue(true);
  databaseConnect().then((isConnected) => expect(isConnected).toBe(true));
});
