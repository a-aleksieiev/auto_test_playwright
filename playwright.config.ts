import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
    timeout: 60000,
    retries: 0,
    use: {
        headless: false,
        viewport: {width: 1920, height: 1080},
        actionTimeout: 15000,
        ignoreHTTPSErrors: true,
        video: 'on',
        screenshot: 'off',
    },
    projects: [
        {
            name:'Chromium',
            use: { browserName: 'chromium' },
        },
        {
            name:'Firefox',
            use: { browserName: 'firefox' },
        },
        {
            name:'Webkit',
            use: { browserName: 'webkit' },
        }
    ],
}

export default config;