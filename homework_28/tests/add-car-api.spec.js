import { test, expect, request as apiRequest } from '@playwright/test';

test.describe('API-based tests for /api/cars endpoint using cookies', () => {
  let apiContext;
  let cookiesParsed;

  const autoSchoolUser = 'yana20@gmail.com';
  const autoSchoolPwd = 'Qwerty123!';

  test.beforeEach(async ({ browser, request }) => {
    // Логін через API
    const loginContext = await apiRequest.newContext({
      baseURL: 'https://qauto.forstudy.space',
    });

    const loginResponse = await loginContext.post('/api/auth/signin', {
      data: {
        email: autoSchoolUser,
        password: autoSchoolPwd,
      },
    });

    expect(loginResponse.ok()).toBeTruthy();
    expect(loginResponse.status()).toBe(200);

    // кукіси після API-логіну
    const loginCookies = await loginContext.storageState();
    const parsedCookies = loginCookies.cookies.map(
      (cookie) => `${cookie.name}=${cookie.value}`
    );
    cookiesParsed = parsedCookies.join('; ');

    // контекст для подальших API-запитів
    apiContext = await browser.newContext({
      baseURL: 'https://qauto.forstudy.space',
      extraHTTPHeaders: {
        cookie: cookiesParsed,
      },
    });
  });

  test('Should successfully create a car with valid data', async () => {
    const requestBody = {
      carBrandId: 1,
      carModelId: 1,
      mileage: 122,
    };

    const response = await apiContext.request.post('/api/cars', {
      data: requestBody,
    });

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(201);

    const responseBody = await response.json();
    expect(responseBody.status).toBe('ok');
    expect(responseBody.data).toMatchObject({
      carBrandId: 1,
      carModelId: 1,
      mileage: 122,
    });
  });

  test('Should return 400 for invalid data', async () => {
    const requestBody = {
      carBrandId: 'invalid',
      carModelId: 1,
      mileage: 122,
    };

    const response = await apiContext.request.post('/api/cars', {
      data: requestBody,
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();
    expect(responseBody.status).toBe('error');
    expect(responseBody.message).toBe('Invalid car brand type');
  });

 
  test('Should return 401 without authentication', async () => {
    const unauthApiContext = await apiRequest.newContext({
      baseURL: 'https://qauto.forstudy.space',
    });

    const requestBody = {
      carBrandId: 1,
      carModelId: 1,
      mileage: 122,
    };

    const response = await unauthApiContext.post('/api/cars', {
      data: requestBody,
    });

    expect(response.status()).toBe(401);

    const responseBody = await response.json();
    expect(responseBody.status).toBe('error'); 
    expect(responseBody.message).toBe('Not authenticated'); 
  });


  test('Should return 404 for incorrect endpoint', async () => {
    const requestBody = {
      carBrandId: 1,
      carModelId: 1,
      mileage: 122,
    };

    const response = await apiContext.request.post('/api/cars-invalid', {
      data: requestBody,
    });

    expect(response.status()).toBe(404); 

    const responseBody = await response.json();
    expect(responseBody.status).toBe('error'); 
    expect(responseBody.message).toBe('Not found'); 
  });

  test('Should delete all cars if present', async () => {
    // Отримуємо всі машини
    const response = await apiContext.request.get('/api/cars');
    expect(response.ok()).toBeTruthy();

    const responseBody = await response.json();
    const cars = responseBody.data;

    if (cars.length > 0) {
      for (const { id } of cars) {
        const deleteResponse = await apiContext.request.delete(`/api/cars/${id}`);
        expect(deleteResponse.ok()).toBeTruthy();
        const deleteResponseBody = await deleteResponse.json();
        expect(deleteResponseBody.data.carId).toEqual(id);
      }
    }
  });
});
