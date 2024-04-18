import { test, expect } from '@playwright/test';
import { defineConfig } from '@playwright/test';
import { login, search } from './helpers';


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
    await page.click('.icon-close.text-16');
    await page.click('text=Онлайн ТБ');
    await page.click('text=Грати з початку');
    await page.waitForTimeout(1000);
    await page.click('text=До прямого ефіру');
    await page.waitForTimeout(1000);
  });

  test('contentGroupAssetPage', async ({page})=>{
    await page.click('.icon-close.text-16');
    await page.click('text=Нове на Київстар ТБ');
    await page.click('text=Дюна: Частина друга');
    await page.click('text=Продовжити перегляд');
    await page.click('.relative.icon-volume');
  })

  test('search', async ({page})=>{
    await search(page);
    await page.waitForTimeout(2000);
    await page.click('.absolute.h-full.w-full.top-0.left-0.z-3');
    await page.waitForTimeout(2000);
    await page.click('.h-24');
    await search(page);
    await page.click('.btn.advanced-search.rounded-none.w-full.h-40.absolute.bottom-0.m-0');
    await page.waitForTimeout(2000);
    await page.click('text=Телеканали');
    await page.click('text="Сніданок з 1+1". Інформаційно-розважальна програма');
    await page.waitForTimeout(2000);
    await page.click('.h-24');
    await search(page);
    await page.click('.btn.advanced-search.rounded-none.w-full.h-40.absolute.bottom-0.m-0');
    await page.click('text=Фільтри');
    await page.click('.whitespace-nowrap.ml-8.typo-body.text-gray-300 >> text=Фільми');
    await page.waitForTimeout(3000);
    await page.click('.ks-btn__ghost >> text=Доступно');
    await page.waitForTimeout(1000);
    await page.click('.ks-btn__ghost >> text=За підпискою');
    await page.waitForTimeout(1000);
    await page.click('.ks-btn__ghost.ng-star-inserted >> text=Покупка');
    await page.waitForTimeout(2000);
  })
})