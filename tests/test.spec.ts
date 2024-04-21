import { test, expect } from '@playwright/test';
import { defineConfig } from '@playwright/test';
import { login, search, chips } from './helpers';


export default defineConfig({
  projects: [
    {
      name: 'My Project', // Choose a descriptive name
      use: { browserName: 'webkit' }, // Replace with 'firefox' or 'webkit' for different browsers
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
    await page.waitForTimeout(5000);
    await page.click('text=Грати з початку');
    await page.waitForTimeout(5000);
    await page.click('text=До прямого ефіру');
    await page.waitForTimeout(5000);
  });

  test('contentGroupAssetPage', async ({page})=>{
    await page.click('.icon-close.text-16');
    await page.click('text=Нове на Київстар ТБ');
    await page.click('text=Дюна: Частина друга');
    await page.click('text=Дивитись');
    await page.click('.relative.icon-volume');
    await page.waitForTimeout(5000);
  })

  test('search', async ({page})=>{
    const channelName = '1+1 Україна HD';
    const labelLocator = await page.locator(`label:text-is-exact("${channelName}")`);
    await search(page);
    await page.waitForTimeout(2000);
    await page.click('.absolute.h-full.w-full.top-0.left-0.z-3');
    await page.waitForTimeout(2000);
    await page.click('.h-24');
    await search(page);
    await page.click('.btn.advanced-search.rounded-none.w-full.h-40.absolute.bottom-0.m-0');
    await page.waitForTimeout(2000);
    await page.click('text=Телеканали');
    await page.click('text="Єдині новини". Телемарафон');
    await page.waitForTimeout(2000);
    await page.click('.h-24');
    await search(page);
    await page.click('.btn.advanced-search.rounded-none.w-full.h-40.absolute.bottom-0.m-0');
    await page.click('text=Фільтри');
    await page.click('.whitespace-nowrap.ml-8.typo-body.text-gray-300 >> text=Фільми');
    await page.waitForTimeout(3000);
    await chips(page);
  })

  test('profileEdit', async ({page})=>{
    await page.click(".w-32.h-32.rounded-full");
    await page.click("text= Персональні дані");
    await page.click(".ks-btn__ghost >> text=Редагувати");
    await page.type("input[type=text]", "t267");
    await page.click("text=Жінка");
    await page.click(".ks-btn__primary >> text=Зберегти");
    const pass = await page.locator(".typo-subtitle >> text=Налаштування пароля");
    if(pass){
    await page.click(".ks-btn__ghost >> text=Змінити");
    }
    await page.click(".checkbox-body");
    await page.click(".ks-btn__primary >> text=Зберегти");
    await page.waitForTimeout(1000);
    await page.click("text=Ввести промокод");
    await page.type("input[type=text]", "test04050Reusable");
    await page.click(".btn__new.btn.btn-primary.form__submit");
    await page.click("text=Гаразд");
    await page.click("text= Вийти з Київстар ТБ");
    await page.click(".ks-btn__primary.w-full.mb-40 >> text= Вийти з Київстар ТБ");
    await page.waitForTimeout(1000);
  })

  test('openAdult', async ({page})=>{
    await page.click(".btn.link.full-height-center >> text=Більше");
    await page.click("text=Для дорослих");
    await page.type("input[type=password]", "1234");
    await page.click("text=Далі");
    await page.click(".text.chips__item-link.ng-star-inserted >> text=Доступно");
    await page.waitForTimeout(2000);
    await page.goBack();
    await page.click("text=Весела сімейка");
    await page.click('text=Дивитись');
    await page.click(".clickable-element.open-popup-btn.relative");
    await page.waitForTimeout(5000);
  })
})