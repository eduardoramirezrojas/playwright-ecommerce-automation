import { expect, Locator, Page } from "@playwright/test";

export class ShopPage {

    readonly page: Page;
    readonly mensShopButton: Locator;
    readonly cartCount: Locator;
    readonly typeCheckbox: Locator;



    constructor(page: Page) {
        this.page = page;
        this.mensShopButton = this.page.getByRole('link', {
            name: 'Shop Men Fashion'
        });
        this.typeCheckbox = this.page.locator('.custom-control-input');
        this.cartCount = this.page.getByTestId('header-cart-count');
    }

    async goto() {
        await this.page.goto('/shop.php');
    }

    async addProductsByQuantity(quantity: number): Promise<void> {
        const products = this.page.locator('[data-testid^="add-to-cart-"]');

        await expect(products.first()).toBeVisible();

        const allProducts = await products.count();
        const productNumber = Math.min(allProducts, quantity);

        for (let index = 0; index < productNumber; index++) {
            const product = products.nth(index);
            const expectedCartCount = String(index + 1);

            await product.click();

            try {
                await expect(this.cartCount).toHaveText(expectedCartCount, {
                    timeout: 3000
                });
            } catch {
                await product.click();

                await expect(this.cartCount).toHaveText(expectedCartCount);
            }
        }
    }

    async filterBy(filterType: 'size' | 'color' | 'price' | 'type', filterValue: string) {

        await this.page.locator(`[data-testid^="filter-${filterType.toLowerCase()}-${filterValue.toLowerCase()}"] + label`).click();

        const locators = {
            size: this.page.locator(`[data-testid^="product-meta"]`),
            color: this.page.locator(`[data-testid^="product-meta"]`),
            price: this.page.locator(`[data-testid^="product-price"]`),
            type: this.page.locator(`[data-testid^="product-category"]`),
        };

        const item = locators[filterType];

        await item.first().waitFor();

        const allItems = await item.allInnerTexts();


        allItems.forEach(text => {

            if (item === locators.price) {

                const newText = Number(text.slice(1));

                const newFilterValue = filterValue.split('-');

                const min = Number(newFilterValue[0]);
                const max = Number(newFilterValue[1]);


                expect(newText).toBeGreaterThanOrEqual(min);
                expect(newText).toBeLessThanOrEqual(max);

            } else {

                expect(text.toLowerCase()).toContain(filterValue.toLowerCase());

            }

        });


    }

    async sortBy(optionText: string) {

        await this.page.getByTestId('sort-select').selectOption(optionText);

        const price = this.page.locator('[data-testid^="product-price-"]');
        const name = this.page.locator('[data-testid^="product-name-"]');

        await price.first().waitFor();


        const allPriceText = await price.allInnerTexts();
        const allNames = await name.allInnerTexts();



        const allPriceTextToNumber = allPriceText.map(text => Number(text.slice(1)));

        const sortedPrices = [...allPriceTextToNumber].sort((a, b) =>
            optionText.includes('asc') ? a - b : b - a
        );

        const sortedNames = [...allNames].sort((a, b) =>
            optionText.includes('asc') ? a.localeCompare(b) : b.localeCompare(a)
        );

        if (optionText.includes('price')) {
            expect(allPriceTextToNumber).toEqual(sortedPrices);
        } else {
            expect(allNames).toEqual(sortedNames);
        }

    }

    async shopPrices(quantity: number): Promise<string[]> {

        const productPrice = this.page.locator('[data-testid^="product-price-"]');

        await productPrice.first().waitFor();


        const allPriceText = await productPrice.allInnerTexts();

        const slicePrice = allPriceText.slice(0, quantity);

        return slicePrice;
    }

    async getPricesAndAddProducts(quantity: number): Promise<string[]> {
        const prices = await this.shopPrices(quantity);
        await this.addProductsByQuantity(quantity);

        return prices;
    }



}
