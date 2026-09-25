import test, { expect } from "@playwright/test";
import { ShopPage } from "../pages/shop.page";

test.describe('Shop', () => {

    let shopPage: ShopPage;

    test.beforeEach(async ({ page }) => {
        shopPage = new ShopPage(page);

        await shopPage.goto();

        await expect(page).toHaveURL(/shop/);

        await shopPage.mensShopButton.click();

        await expect(page).toHaveURL('/mens-wear.php');
    });

    test('Go to shop, add 3 products and expect the cart to have the same numbers', async () => {

        await shopPage.addProductsByQuantity(3);

        await expect(shopPage.cartCount).toHaveText('3');

    });

    test('Should filter products by type', async () => {
        await shopPage.filterBy('type', 'formal');
    });

    test('Should filter products by price range', async () => {
        await shopPage.filterBy('price', '101-200');
    });

    test('Should filter products by size', async () => {
        await shopPage.filterBy('size', 'S');
    });

    test('Should filter products by color', async () => {
        await shopPage.filterBy('color', 'Black');
    });

    test('Should sort products by price low to high', async () => {
        await shopPage.sortBy('price-asc');
    });

    test('Should sort products by price high to low', async () => {
        await shopPage.sortBy('price-desc');
    });

    test('Should sort products by name A to Z', async () => {
        await shopPage.sortBy('name-asc');
    });

    test('Should sort products by name Z to A', async () => {
        await shopPage.sortBy('name-desc');
    });

});