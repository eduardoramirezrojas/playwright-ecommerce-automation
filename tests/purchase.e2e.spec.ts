import test, { expect } from "@playwright/test";
import { ShopPage } from "../pages/shop.page";
import { CartPage } from "../pages/cart.page";
import { CheckoutPage } from "../pages/checkout.page";
import { validAddress } from "../data/checkoutData";
import { ConfirmPage } from "../pages/confirm.page";
import { ThanksPage } from "../pages/thanks.page";

test('Should complete a purchase successfully', async ({ page }) => {

    const shopPage = new ShopPage(page);
    const cartPage = new CartPage(page);
    const checkOutPage = new CheckoutPage(page);
    const confirmPage = new ConfirmPage(page);
    const thanksPage = new ThanksPage(page);


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

    // await confirmPage.dataCheck(confirmFields.testId);

    await confirmPage.placeOrderButton.click();
    await expect(page).toHaveURL(/thanks/);

    await expect(page).toHaveURL(/thanks/);
    await expect(thanksPage.thanksMessage).toBeVisible();


});