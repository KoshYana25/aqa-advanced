import { test, expect, request as apiRequest } from '@playwright/test';

test.describe('API tests for /api/cars endpoint', () => {
  let apiContext;

  const autoSchoolUser = 'yana20@gmail.com';
  const autoSchoolPwd = 'Qwerty123!';

  // API-контекст із передачею cookies перед тестами
  test.beforeEach(async ({ page }) => {
    apiContext = await apiRequest.newContext({
      baseURL: 'https://qauto.forstudy.space',
    });

    // Aвтентифікація
    await page.goto('/');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.locator('input[id="signinEmail"]').fill(autoSchoolUser);
    await page.locator('input[id="signinPassword"]').fill(autoSchoolPwd);
    await page.getByRole('button', { name: 'Login' }).click();

    // cookies після авторизації
    const cookies = await page.context().cookies();

    // Створення нового API контексту з переданими cookies
    apiContext = await apiRequest.newContext({
      baseURL: 'https://qauto.forstudy.space',
      cookies: cookies, 
    });
  });

  test('Should successfully create a car with valid data', async () => {

    const requestBody = {
      carBrandId: 1,
      carModelId: 1,
      mileage: 122,
    };

    const response = await apiContext.post('https://qauto.forstudy.space/api/cars', {
      data: requestBody,
    });

    console.log('Response status:', response.status());
    console.log('Response body:', await response.text());

    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

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
      carBrandId: 'invalid', // Некоректний ID
      carModelId: 1,
      mileage: 122,
    };

    const response = await apiContext.post('https://qauto.forstudy.space/api/cars', { data: requestBody });
    expect(response.status()).toBe(400);

    const responseBody = await response.json();
    expect(responseBody.status).toBe('error');
    expect(responseBody.message).toBe('Bad request');
  });

  test('Should return 401 without authentication', async () => {

    const requestBody = {
      carBrandId: 1,
      carModelId: 1,
      mileage: 122,
    };

    const response = await apiContext.post('https://qauto.forstudy.space/api/cars', { data: requestBody });
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

    const response = await apiContext.post('/api/cars-invalid', { data: requestBody });
    expect(response.status()).toBe(404);

    const responseBody = await response.json();
    expect(responseBody.status).toBe('error');
    expect(responseBody.message).toBe('Not found');
  });
});
