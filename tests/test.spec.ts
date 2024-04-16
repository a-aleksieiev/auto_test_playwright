import { test, expect } from '@playwright/test';
import { defineConfig } from '@playwright/test';
import { login } from './helpers';


export default defineConfig({
  projects: [
    {
      name: 'My Project', // Choose a descriptive name
      use: { browserName: 'chromium' }, // Replace with 'firefox' or 'webkit' for different browsers
    },
  ],
});

test.describe.only('hooks', ()=>{
  test.beforeEach(async ({page})=>{
    await login(page);
  })
  test('onlineTv', async ({ page }) => {
    await page.click('text=Онлайн ТБ');
    await page.click('text=Грати з початку');
    await page.click('text=До прямого ефіру');
    await page.waitForTimeout(10000);
  });

  test('contentGroupAssetPage', async ({page})=>{
    await page.click('text=Нове на Київстар ТБ');
    await page.click('text=Дюна: Частина друга');
    if(await page.locator('text=Дивитись'))
      {
        await page.click('text=Дивитись');
      }
      else if(await page.locator('text=Продовжити перегляд'))
        {
          await page.click('text=Продовжити перегляд');
        }
    await page.click('.relative.icon-volume');
    await page.waitForTimeout(10000);
  })
})