const websiteName = 'https://tv.kyivstar.ua';
export async function login(page){
    await page.goto(websiteName);
    await page.click("text=Увійти");
    await page.click("text=Особовий рахунок");
    await page.type("input[type=text]", "demo_alk");
    await page.type("input[type=password]", "1234567");
    await page.click('//*[@id="cdk-overlay-0"]/vd-overlay-modal/div/vd-base-authorization/div[4]/button'); // Змінив селектор тут
    await page.click('//*[@id="cdk-overlay-1"]/vd-overlay-modal/div/vd-choose-profile/div/div/div[1]/div[2]/div/div[1]');
}

export async function search(page) {
    await page.click('.btn.icon-btn');
    await page.type("input[type=text]", "1+1");
    await page.waitForTimeout(2000);
}

export async function chips(page) {
    await page.click('.ks-btn__ghost >> text=Доступно');
    await page.waitForTimeout(1000);
    await page.click('.ks-btn__ghost >> text=За підпискою');
    await page.waitForTimeout(1000);
}