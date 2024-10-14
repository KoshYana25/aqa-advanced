const fetchData = require("./task1_request");
const axios = require("axios");

// Мокуємо axios для імітації помилки
jest.mock("axios");

test("should return error message when request fails", async () => {
  // Налаштування моку для повернення помилки
  axios.get.mockRejectedValue(new Error("Network Error"));

  const result = await fetchData();

  expect(result).toBe("An error occurred while fetching data");
});
