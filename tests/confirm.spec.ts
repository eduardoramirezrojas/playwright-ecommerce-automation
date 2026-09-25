import test, { expect } from "@playwright/test";
import { ShopPage } from "../pages/shop.page";
import { CartPage } from "../pages/cart.page";
import { CheckoutPage } from "../pages/checkout.page";
import { confirmFields, validAddress } from "../data/checkoutData";
import { ConfirmPage } from "../pages/confirm.page";

test.describe.serial('Confirm', () => {

    let shopPage: ShopPage;
    let cartPage: CartPage;
    let checkOutPage: CheckoutPage;
    let confirmPage: ConfirmPage;

    test.beforeEach(async ({ page }) => {
        shopPage = new ShopPage(page);
        cartPage = new CartPage(page);
        checkOutPage = new CheckoutPage(page);
        confirmPage = new ConfirmPage(page);


        await shopPage.goto();
        await expect(page).toHaveURL(/shop/);

        await shopPage.mensShopButton.click();
        await expect(page).toHaveURL('/mens-wear.php');

        await shopPage.getPricesAndAddProducts(3);

        await cartPage.goto();
        await expect(page).toHaveURL('/cart.php');

        await cartPage.goToCheckout();
        await expect(page).toHaveURL('/checkout.php');

        await checkOutPage.fillBillingAddress(validAddress);

        await checkOutPage.continueButton.click();
        await expect(page).toHaveURL(/confirm/);

    });

    test('Should preserve checkout data on confirm page', async () => {
        for (const data of confirmFields) {
            const actualValue = await confirmPage.dataCheck(data.testId);

            expect(actualValue.trim()).toBe(validAddress[data.field]);
        }
    });

     test('Should navigate to thanks page', async ({ page }) => {
            await expect(
                confirmPage.linkName('Place Order')
            ).toBeVisible();
    
            await confirmPage.placeOrderButton.click();
    
            await expect(page).toHaveURL(/thanks/);
        });
});