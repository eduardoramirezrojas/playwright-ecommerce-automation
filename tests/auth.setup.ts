import { test as setup } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

const authFile = 'playwright/.auth/standard-user.json';

setup('authenticate', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    await loginPage.login(
        'demo@demo.com',
        'demo'
    );

    await page.context().storageState({
        path: authFile
    });
});