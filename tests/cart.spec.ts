import test, { expect } from "@playwright/test";
import { CartPage } from "../pages/cart.page";
import { ShopPage } from "../pages/shop.page";

test.describe('Cart', () => {
    let shopPage: ShopPage;
    let cartPage: CartPage;
    let shopPrices: string[];

    test.beforeEach(async ({ page }) => {
        shopPage = new ShopPage(page);
        cartPage = new CartPage(page);

        await shopPage.goto();
        await expect(page).toHaveURL(/shop/);

        await shopPage.mensShopButton.click();
        await expect(page).toHaveURL('/mens-wear.php');

        shopPrices = await shopPage.getPricesAndAddProducts(3);

        await cartPage.goto();
        await expect(page).toHaveURL('/cart.php');
    });

    test('Should display the same product prices in the shop and cart', async () => {
        const cartPrices = await cartPage.getCartPrices();

        expect(cartPrices).toEqual(shopPrices);
    });

    test('Should display the correct cart total', async () => {
        const calculatedCartTotal = await cartPage.calculateCartTotal();
        const displayedCartTotal = await cartPage.getDisplayedCartTotal();

        expect(displayedCartTotal).toBe(calculatedCartTotal);
    });

    test('Should remove a product from the cart', async () => {
        await cartPage.removeItem('Black T-Shirt');

        await expect(
            cartPage.productName('Black T-Shirt')
        ).not.toBeVisible();
    });

    test('Should calculate the correct product total based on quantity', async () => {
        const calculatedProductTotal =
            await cartPage.calculateProductTotal('Black T-Shirt');

        const displayedProductTotal =
            await cartPage.getProductTotal('Black T-Shirt');

        expect(displayedProductTotal).toBe(calculatedProductTotal);
    });

    test('Should navigate to checkout', async ({ page }) => {
        await expect(
            cartPage.linkName('Proceed To Checkout')
        ).toBeVisible();

        await cartPage.goToCheckout();

        await expect(page).toHaveURL(/checkout/);
    });
});