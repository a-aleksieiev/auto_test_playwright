import { test, expect } from '@playwright/test';
import { defineConfig } from '@playwright/test';
import { loginFTTB, loginMSISDN, search, chips, buy } from './helpers';


export default defineConfig({
  projects: [
    {
      name: 'My Project', // Choose a descriptive name
      use: { browserName: 'webkit' }, // Replace with 'firefox' or 'webkit' for different browsers
    },
  ],
});

test.describe.only('FTTB', ()=>{
  test.beforeEach(async ({page})=>{
    await loginFTTB(page);
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
    const posterLocator = page.locator('.poster__media');
    await page.click('.icon-close.text-16');
    await page.click('text=Нове на Київстар ТБ');
    await page.click('.chips-container__item.ng-star-inserted >> text=За підпискою');
    await page.waitForTimeout(2000);
    await page.click('.chips-container__item.ng-star-inserted >> text=Покупка');
    await page.waitForTimeout(2000);
    await page.click('.chips-container__item.ng-star-inserted >> text=Доступно');
    await page.waitForTimeout(2000);
    await page.click(".sort-content-select.ng-star-inserted");
    await page.click('text=За новизною');
    await page.waitForTimeout(3000);
    await page.click(".sort-content-select.ng-star-inserted");
    await page.click('text=За рейтингом IMDB');
    await page.waitForTimeout(3000);
    await page.click(".sort-content-select.ng-star-inserted");
    await page.click('text=За датою додавання');
    await page.waitForTimeout(3000);
    await page.click(".sort-content-select.ng-star-inserted");
    await page.click('text=За популярністю');
    await page.waitForTimeout(3000);
    await posterLocator.first().click();
    await page.click('.ks-btn__primary');
    await page.click('.relative.icon-volume');
    await page.waitForTimeout(5000);
  })

  test('search', async ({page})=>{
    const channelPoster = page.locator('.poster-wrapper.live'); 
    await search(page);
    await page.waitForTimeout(2000);
    await page.click('.absolute.h-full.w-full.top-0.left-0.z-3'); // відкривається ассет зі списку каналів
    await page.click('.h-24');// назад на головну сторінку
    await search(page);//повторний пошук
    await page.click('.btn.advanced-search.rounded-none.w-full.h-40.absolute.bottom-0.m-0');//відкривається сторінка фільтрів
    await page.waitForTimeout(2000);
    await page.click('text=Телеканали');//обирається КГ тв канали
    await channelPoster.first().click();//клік на перший тв канал у списку
    await page.waitForTimeout(2000);
    await page.click('.h-24');//назад на головну
    await search(page);
    await page.click('.btn.advanced-search.rounded-none.w-full.h-40.absolute.bottom-0.m-0');//відкривається сторінка фільтрів
    await page.click('text=Фільтри');//йдемо у фільтри
    await page.click('.whitespace-nowrap.ml-8.typo-body.text-gray-300 >> text=Фільми');//обираємо фільми
    await page.waitForTimeout(3000);
    await chips(page);//проходимо по чіпсам
  })

  test('profileEdit', async ({page})=>{
    const inputLocator = await page.locator('input[type=text]')
    await page.click(".w-32.h-32.rounded-full");
    await page.click("text= Персональні дані");
    await page.click(".ks-btn__ghost >> text=Редагувати");
    await inputLocator.fill('');
    await page.waitForTimeout(2000);
    await inputLocator.fill('t300');
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
    await page.click("text = Закрити");
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
    await page.click('.ks-btn__primary');
    await page.click('.icon-gear.clickable-element.relative');
    await page.click('.title');
    await page.click('.settings-form__label');
    // await page.click(".clickable-element.open-popup-btn.relative");
    // await page.click('/html/body/vd-root/div/div/ng-component/vd-asset-player/div[1]/div[2]/p/span');
    await page.waitForTimeout(5000);
  })

  test('myVideo', async ({page})=>{
    await page.click(".btn.link.items-end");
    await page.waitForTimeout(2000);
    await page.click(".btn >> text= Обране ТБ");
    await page.waitForTimeout(2000);
    await page.click(".btn >> text= Куплене");
    await page.waitForTimeout(2000);
    await page.click(".btn >> text= Обране відео");
    await page.waitForTimeout(2000);
    await page.click(".btn >> text= Переглянуті");
    await page.waitForTimeout(2000);
  })

  test('purchase',async ({page})=>{
    await buy(page);
  })

  test('promoZone', async ({page})=>{
    const promoImageLocator = page.locator('.ng-star-inserted');
    await page.click('.icon-chevron-right');
    await page.click('.icon-chevron-right');
    await page.click('.icon-chevron-left')
    await promoImageLocator.first().click();
    await page.waitForTimeout(2000);
  })
})

test.describe.only('MSISDN', ()=>{
  test.beforeEach(async ({page})=>{
    await loginMSISDN(page);
  })

  test('packagePage', async ({page})=>{
    const packageRaw = page.locator('.cell');
    await page.click(".btn.link >> text=Пакети");
    await packageRaw.first().click();
    await page.waitForTimeout(2000);
  })
})