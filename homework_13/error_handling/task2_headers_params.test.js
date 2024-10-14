const fetchCustomData = require("./task2_headers_params");
const axios = require("axios");

// Мокуємо axios для перевірки аргументів, з якими він був викликаний
jest.mock("axios");

test("should include custom headers and URL parameters in the request", async () => {
  const params = { id: 1, limit: 3 };
  const headers = {
    Authorization: "Bearer sample-token",
    "Custom-Header": "example-value",
  };

  // Налаштування моку для повернення фіктивної відповіді
  axios.get.mockResolvedValue({
    data: [{ id: "1", name: "Google Pixel 6 Pro" }],
  });

  await fetchCustomData(params, headers);

  // Перевірка, що axios був викликаний з правильними параметрами
  expect(axios.get).toHaveBeenCalledWith(
    "https://api.restful-api.dev/objects",
    {
      params: { id: 1, limit: 3 },
      headers: {
        Authorization: "Bearer sample-token",
        "Custom-Header": "example-value",
      },
    }
  );
});
