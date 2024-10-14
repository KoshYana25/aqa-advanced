const fetchCustomData = require("./task2_headers_params");
const axios = require("axios");

jest.mock("axios");

describe("Testing fetchCustomData with mocked Axios", () => {
  test("should handle a successful HTTP request", async () => {
    const params = { id: 1, limit: 3 };
    const headers = {
      Authorization: "Bearer sample-token",
      "Custom-Header": "example-value",
    };

    // Налаштування мок для імітації успішного запиту
    const mockResponse = { data: [{ id: "1", name: "Google Pixel 6 Pro" }] };
    axios.get.mockResolvedValue(mockResponse);

    // Виконання функції
    const result = await fetchCustomData(params, headers);

    expect(result).toEqual(mockResponse.data);

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

  test("should handle a failed HTTP request", async () => {
    const params = { id: 1, limit: 3 };
    const headers = {
      Authorization: "Bearer sample-token",
      "Custom-Header": "example-value",
    };

    // Налаштування мок для імітації помилкового запиту
    axios.get.mockRejectedValue(new Error("Network Error"));

    // Виконання функцію
    const result = await fetchCustomData(params, headers);

    expect(result).toBe("An error occurred while fetching data");

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
});
