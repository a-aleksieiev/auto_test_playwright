import { test, expect } from '@playwright/test';
import { defineConfig } from '@playwright/test';

const websiteName = 'https://tv.kyivstar.ua';

export default defineConfig({
  projects: [
    {
      name: 'My Project', // Choose a descriptive name
      use: { browserName: 'chromium' }, // Replace with 'firefox' or 'webkit' for different browsers
    },
  ],
});

test.describe('firstTestSuite', ()=> {
  test('loginSuccess', async ({ page }) => {
    await page.goto(websiteName);
    await page.click("text=Увійти");
    await page.click("text=Особовий рахунок");
    await page.type("input[type=text]", "t26");
    await page.type("input[type=password]", "1234567");
    await page.click('//*[@id="cdk-overlay-0"]/vd-overlay-modal/div/vd-base-authorization/div[4]/button'); // Змінив селектор тут
    await page.click('//*[@id="cdk-overlay-1"]/vd-overlay-modal/div/vd-choose-profile/div/div/div[1]/div[2]/div/div[1]');
    await page.click('text=Онлайн ТБ');
    await page.click('text=Грати з початку');
    await page.click('text=До прямого ефіру');
    await page.click('.h-24');
  });

  test('contentGroup', async ({page})=>{
    await page.goto(websiteName);
    await page.click("text=Увійти");
    await page.click("text=Особовий рахунок");
    await page.type("input[type=text]", "t26");
    await page.type("input[type=password]", "1234567");
    await page.click('//*[@id="cdk-overlay-0"]/vd-overlay-modal/div/vd-base-authorization/div[4]/button'); // Змінив селектор тут
    await page.click('//*[@id="cdk-overlay-1"]/vd-overlay-modal/div/vd-choose-profile/div/div/div[1]/div[2]/div/div[1]');
    await page.click('text=Рекомендації для тебе');
    await page.click(".absolute.h-full.w-full.top-0.left-0.z-3")
  })
})