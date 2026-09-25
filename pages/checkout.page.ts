import { Locator, Page } from "@playwright/test";
import { AddressType } from '../types/checkout.types';

export class CheckoutPage {

    readonly page: Page;
    readonly nameInput: Locator;
    readonly middleNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly mobileNo: Locator;
    readonly address: Locator;
    readonly state: Locator;
    readonly city: Locator;
    readonly pinCode: Locator;
    readonly continueButton: Locator;



    constructor(page: Page) {
        this.page = page;
        this.nameInput = this.page.getByLabel('First Name');
        this.middleNameInput = this.page.getByLabel('Middle Name');
        this.lastNameInput = this.page.getByLabel('Last Name');
        this.emailInput = this.page.getByLabel('E-mail');
        this.mobileNo = this.page.getByLabel('Mobile No.');
        this.address = this.page.getByLabel('Address');
        this.state = this.page.getByLabel('State');
        this.city = this.page.getByLabel('City');
        this.pinCode = this.page.getByLabel('Pin Code');
        this.continueButton = this.page.getByRole('button', { name: 'Continue' });
    }

    async fillBillingAddress({ name, middleName, lastName, email, mobile, address, state, city, pinCode }: AddressType) {

        await this.nameInput.fill(name);
        await this.middleNameInput.fill(middleName);
        await this.lastNameInput.fill(lastName);
        await this.emailInput.fill(email);
        await this.mobileNo.fill(mobile);
        await this.address.fill(address);
        await this.state.fill(state);
        await this.city.fill(city);
        await this.pinCode.fill(pinCode);
    }

    async getCheckoutPrices(): Promise<string[]> {
        const prices = this.page.locator(
            '[data-testid^="checkout-item-price-"]'
        );

        await prices.first().waitFor();

        return await prices.allInnerTexts();
    }

    async calculateOrderTotal(): Promise<number> {

        const totals = this.page.locator('[data-testid^="checkout-item-total-"]');

        await totals.first().waitFor();

        const allTotals = await totals.allInnerTexts();

        const totalsToNumber = allTotals.map(total => {
            const slicedTotal = total.slice(1);

            return Number(slicedTotal);
        });
        
        const sumTotal = totalsToNumber.reduce((acc,curr) => acc + curr, 0);

        return sumTotal;

    }

    async getDisplayedOrderTotal(): Promise<number> {
        const orderTotal = await this.page.getByTestId('order-total').innerText(); 

        return Number(orderTotal.slice(1));
    }
}