const axios = require("axios");

const baseURL = "https://api.restful-api.dev/objects";

test("GET all data", async () => {
  const response = await axios.get(baseURL, {
    validateStatus: () => true,
  });

  expect(response.status).toBe(200);
  expect(Array.isArray(response.data)).toBe(true);
  expect(response.data.length).toBeGreaterThan(0);
});

test("GET specific object with ID 7", async () => {
  const response = await axios.get(`${baseURL}/7`, {
    validateStatus: () => true,
  });

  expect(response.status).toBe(200);
  expect(response.data).toBeDefined();

  // Перевірка, що отриманий об'єкт має правильний ID та назву
  expect(response.data.id).toBe("7");
  expect(response.data.name).toBe("Apple MacBook Pro 16");
});

let objectId; // Тут буде збережений ID створеного об'єкта

test("POST - Create a new object", async () => {
  const postResponse = await axios.post(
    `${baseURL}`,
    {
      name: "Apple MacBook Pro 16",
      data: {
        year: 2019,
        price: 1849.99,
        "CPU model": "Intel Core i9",
        "Hard disk size": "1 TB",
      },
    },
    { validateStatus: () => true }
  );

  objectId = postResponse.data.id;
  expect(objectId).toBeDefined(); // Перевірка чи ID існує
  expect(postResponse.status).toBe(200);
  expect(postResponse.data).toHaveProperty("name", "Apple MacBook Pro 16"); // Перевірка назви об'єкта
  expect(postResponse.data.data).toMatchObject({
    year: 2019,
    price: 1849.99,
    "CPU model": "Intel Core i9",
    "Hard disk size": "1 TB",
  }); // Перевірка, що дані збігаються
});

test("PUT valid payload", async () => {
  const response = await axios.put(
    `https://api.restful-api.dev/objects/${objectId}`,
    {
      name: "Apple MacBook Pro 16 Updated",
      data: {
        year: 2020,
        price: 1999.99,
        "CPU model": "Intel Core i9",
        "Hard disk size": "2 TB",
      },
    },
    { validateStatus: () => true }
  );
  expect(response.status).toBe(200);
  expect(response.data).toHaveProperty("id", objectId); // Перевірка, що ID збігається
  expect(response.data).toHaveProperty("name", "Apple MacBook Pro 16 Updated"); // Перевірка оновленої назви
  expect(response.data.data).toMatchObject({
    year: 2020,
    price: 1999.99,
    "CPU model": "Intel Core i9",
    "Hard disk size": "2 TB",
  }); // Перевірка, що оновлені дані збігаються
});

test("PATCH valid payload", async () => {
  const response = await axios.patch(
    `https://api.restful-api.dev/objects/${objectId}`,
    {
      data: {
        price: 1899.99, // Оновимо тільки ціну
      },
    },
    { validateStatus: () => true }
  );
  expect(response.status).toBe(200);
  expect(response.data.data.price).toBe(1899.99); // Перевірка оновленої ціни
});

test("DELETE object", async () => {
  const response = await axios.delete(
    `https://api.restful-api.dev/objects/${objectId}`,
    { validateStatus: () => true }
  );
  expect(response.status).toBe(200);
});
