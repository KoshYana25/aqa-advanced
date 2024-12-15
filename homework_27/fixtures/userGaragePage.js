import { test as base } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const storageStatePath = path.resolve(__dirname, 'storageState.json');

// Функція для логіну та збереження стану сесії
const loginAsUser = async (page, baseURL) => {
  
  await page.goto(baseURL);
  
  // Логін через форму
  await page.click('button.btn-outline-white.header_signin'); 
  await page.fill('input#signinEmail', 'yana20@gmail.com'); 
  await page.fill('input#signinPassword', 'Qwerty123!'); 
  await page.click('button:has-text("Login")'); 

  // Перевірка, що логін успішний
  await page.waitForSelector('h1:has-text("Garage")'); 

  // Збереження лише cookies для поточного сайту
  const cookies = await page.context().cookies(baseURL);
  const filteredStorageState = {
    cookies
  };
  
  // Збереження  файлу
  fs.writeFileSync(storageStatePath, JSON.stringify(filteredStorageState, null, 2));
};

// Розширена фікстура для роботи з авторизованою сторінкою
const test = base.extend({
  userGaragePage: async ({ browser, baseURL }, use) => {
    // Перевірка, чи існує storageState.json
    if (!fs.existsSync(storageStatePath)) {
      throw new Error('Storage state file not found. Please ensure loginAsUser is called in beforeAll.');
    }

    // Завантаження збереженого стану сесії
    const context = await browser.newContext({
      storageState: storageStatePath,
    });
    const page = await context.newPage();
    await page.goto(`${baseURL}/panel/garage`); // Відкриття GaragePage
    await use(page); 
    await context.close(); 
  },
});

export { test, loginAsUser };
