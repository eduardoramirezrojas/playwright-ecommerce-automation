import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

test.describe('Login and invalid login', () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goto();
    });


    test('It should be a successful login.', async ({ page }) => {

        await loginPage.login('demo@demo.com', 'demo');

        await expect(page).toHaveURL(/shop/);

    });


    test('It should display an email required message', async () => {

        await loginPage.login('', 'demo');

        await expect(loginPage.errorMessageEmail).toHaveText('Please enter your email.');

    });



    test('It should display an invalid email format message.', async () => {
        await loginPage.login('esto-no-es-email', 'demo');

        await expect(loginPage.errorMessageEmail).toHaveText('Please enter a valid email address.');
    });



    test('It should display a password required message.', async () => {

        await loginPage.login('demo@demo.com', '');

        await expect(loginPage.errorMessagePassword).toHaveText('Please enter your password.');

    });


    test('It should display an error message for an invalid email or password.', async () => {

        await loginPage.login('nyezyu21@gmail.com', 'asdf');

        await expect(loginPage.errorMessageLogin).toHaveText('Invalid email or password!');

    });


});