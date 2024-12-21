import { test, expect } from '../fixtures/userGaragePage';

test.describe('Garage Page Tests', () => {
  test('Verify Add Car button is visible', async ({ userGaragePage }) => {
    const isAddCarVisible = await userGaragePage.isAddCarButtonVisible();
    expect(isAddCarVisible).toBeTruthy();
  });
});
