import { Locator, Page } from "@playwright/test";

export class LoginPage {

    readonly page: Page;
    readonly email: Locator;
    readonly password: Locator;
    readonly rememberMeCheckbox: Locator;
    readonly loginButton: Locator;
    readonly errorMessageEmail: Locator;
    readonly errorMessagePassword: Locator;
    readonly errorMessageLogin: Locator;

    constructor(page: Page) {
        this.page = page;
        this.email = page.getByPlaceholder('Email');
        this.password = page.getByPlaceholder('Password');
        this.rememberMeCheckbox = page.getByRole('checkbox', { name: 'Remember me' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessageEmail = page.getByTestId('login-email-error');
        this.errorMessagePassword = page.getByTestId('login-password-error');
        this.errorMessageLogin = page.getByTestId('login-error-message');

    }

    async goto() {
        await this.page.goto('/');
    }

    async login(email: string, password: string) {
        await this.email.fill(email);
        await this.password.fill(password);
        await this.loginButton.click();
    }

}

