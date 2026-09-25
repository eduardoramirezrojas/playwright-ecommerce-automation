import test, { expect } from "@playwright/test";
import { ShopPage } from "../pages/shop.page";
import { CartPage } from "../pages/cart.page";
import { CheckoutPage } from "../pages/checkout.page";
import { invalidEmails, phoneBoundaryCases, requiredFields, validAddress } from '../data/checkoutData';


test.describe.serial('Checkout', () => {

    let shopPage: ShopPage;
    let cartPage: CartPage;
    let checkOutPage: CheckoutPage;
    let shopPrices: string[];

    test.beforeEach(async ({ page }) => {
        shopPage = new ShopPage(page);
        cartPage = new CartPage(page);
        checkOutPage = new CheckoutPage(page);

        await shopPage.goto();
        await expect(page).toHaveURL(/shop/);

        await shopPage.mensShopButton.click();
        await expect(page).toHaveURL('/mens-wear.php');

        shopPrices = await shopPage.getPricesAndAddProducts(3);

        await cartPage.goto();
        await expect(page).toHaveURL('/cart.php');

        await cartPage.goToCheckout();
        await expect(page).toHaveURL('/checkout.php');

    });

    test('Happy path', async ({ page }) => {

        await checkOutPage.fillBillingAddress({
            name: 'Eduardo',
            middleName: 'Ramirez',
            lastName: 'Rojas',
            email: 'edu@gmail.com',
            mobile: '1234567890',
            address: 'SiempreViva',
            state: 'Miami',
            city: 'Florida',
            pinCode: '12345',
        });

        await checkOutPage.continueButton.click();
        await expect(page).toHaveURL(/confirm/);


    });

    for (const data of requiredFields) {
        test(`Should show an error when ${data.field} is empty`, async () => {
            const invalidAddress = {
                ...validAddress,
                [data.field]: '',
            };

            await checkOutPage.fillBillingAddress(invalidAddress);
            await checkOutPage.continueButton.click();

            await expect(
                checkOutPage.page.getByTestId(data.errorTestId)
            ).toHaveText(data.error);
        });
    }

    for (const email of invalidEmails) {
        test(`Should reject invalid email: ${email}`, async () => {
            const invalidAddress = {
                ...validAddress,
                email,
            };

            await checkOutPage.fillBillingAddress(invalidAddress);

            const isValid = await checkOutPage.emailInput.evaluate(
                (input: HTMLInputElement) => input.validity.valid
            );

            expect(isValid).toBe(false);
        });
    }

    for (const data of phoneBoundaryCases) {
        test(`Should validate phone with ${data.phone.length} digits`, async () => {

            const address = {
                ...validAddress,
                mobile: data.phone
            };

            await checkOutPage.fillBillingAddress(address);
            await checkOutPage.continueButton.click();

            if (data.shouldBeValid) {
                await expect(checkOutPage.page).toHaveURL('/confirm.php');
            } else {
                await expect(
                    checkOutPage.page.getByTestId('checkout-phone-error')
                ).toHaveText('Phone Number Should be 10 digit long.');
            }

        });
    }


    test('Should display the same product prices in checkout', async () => {
        const checkoutPrices = await checkOutPage.getCheckoutPrices();

        expect(checkoutPrices).toEqual(shopPrices);
    });

    test('Should display the correct order total', async () => {
        const calculatedTotal = await checkOutPage.calculateOrderTotal();
        const displayedTotal = await checkOutPage.getDisplayedOrderTotal();

        expect(displayedTotal).toBe(calculatedTotal);
    });

});