const websiteName = 'https://webng.dev.vidmind.com/ua/';
export async function loginFTTB(page){
    await page.goto(websiteName);
    await page.click("text=Увійти");
    await page.click("text=Особовий рахунок");
    await page.type("input[type=text]", "t300");
    await page.type("input[type=password]", "123456");
    await page.keyboard.press('Enter'); 
    await page.click('//*[@id="cdk-overlay-1"]/vd-overlay-modal/div/vd-choose-profile/div/div/div[1]/div[2]/div/div[1]');
}

export async function loginMSISDN(page) {
    const loginButton = page.locator('//*[@id="cdk-overlay-2"]/vd-overlay-modal/div/vd-base-authorization/div[3]/button');
    await page.goto(websiteName);
    await page.click("text=Увійти");
    await page.type("input[type=tel]", "0688758389");
    await page.click('.ks-btn__primary.w-full >> text=Далі');
    await page.type("input[type=text]", "1111");
    await page.keyboard.press('Enter');
    await page.click('//*[@id="cdk-overlay-1"]/vd-overlay-modal/div/vd-choose-profile/div/div/div[1]/div[2]/div/div[1]');
}

export async function search(page) {
    await page.click('.btn.icon-btn');
    await page.type("input[type=text]", "1+1");
    await page.waitForTimeout(2000);
}

export async function chips(page) {
    await page.click('.ks-btn__ghost >> text=Доступно');
    await page.waitForTimeout(3000);
    await page.click('.ks-btn__ghost >> text=За підпискою');
    await page.waitForTimeout(2000);
}

export async function buy(page) {
    const clickLocator = page.locator("text=Покупка"); 
    await clickLocator.first().click();
    await page.click(".ks-btn__primary");
    await page.click(".ng-star-inserted >> text=Купити в SD якості");
    await page.click("text=444433******1111");
    await page.waitForTimeout(1000);
    await page.click(".payment__btn.btn.btn-primary");
    await page.click(".ks-btn__primary.w-full >> text=Почати перегляд");
    await page.waitForTimeout(1000);
    await page.click(".ks-btn__primary");
    await page.waitForTimeout(5000);
}