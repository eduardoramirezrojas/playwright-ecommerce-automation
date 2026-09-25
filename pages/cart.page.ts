import { expect, Page } from "@playwright/test";

export class CartPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/cart.php');
    }

    async calculateProductTotal(productName: string): Promise<number> {
        const rows = this.page.locator('[data-testid^="cart-row-"]');
        const filteredRows = rows.filter({ hasText: productName });

        await rows.first().waitFor();        

        const priceText = await filteredRows
            .locator('[data-testid^="cart-item-price-"]')
            .innerText();

        const priceToNumber = Number(priceText.slice(1));

        const quantityText = await filteredRows
            .getByRole('spinbutton')
            .inputValue();

        const quantityToNumber = Number(quantityText);

        const total = priceToNumber * quantityToNumber;

        return total;
    }

    async getProductTotal(productName: string): Promise<number> {
        const rows = this.page.locator('[data-testid^="cart-row-"]');
        const filteredRows = rows.filter({ hasText: productName });

        await rows.first().waitFor();     
        

        const totalText = await filteredRows
            .locator('[data-testid^="cart-item-total-"]')
            .innerText();

        const totalToNumber = Number(totalText.slice(1));

        return totalToNumber;
    }

    async calculateCartTotal(): Promise<number> {
        const totalTexts = this.page.locator('[data-testid^="cart-item-total-"]');

        await totalTexts.first().waitFor();

        const allTotalsTexts = await totalTexts.allInnerTexts();

        const allTotals = allTotalsTexts.map(total => {
            const totalToNumber = total.slice(1);
            return Number(totalToNumber);
        });

        const allTotalSum = allTotals.reduce(
            (acc, curr) => acc + curr,
            0
        );

        return allTotalSum;
    }

    async getDisplayedCartTotal(): Promise<number> {
        const text = await this.page
            .getByTestId('cart-total')
            .innerText();

        return Number(text.replace(/[^0-9.]/g, ''));
    }

    async getCartPrices(): Promise<string[]> {
        const productPrice = this.page.locator(
            '[data-testid^="cart-item-price-"]'
        );

        await productPrice.first().waitFor();

        const allPriceText = await productPrice.allInnerTexts();

        return allPriceText;
    }

    async removeItem(productName: string) {
        const item = this.page.getByRole('button', {
            name: `Remove ${productName} from cart`
        });

        await expect(item).toBeVisible();
        await item.click();
    }

    productName(productName: string) {
        return this.page.getByText(productName);
    }

    async goToCheckout() {
        await this.page
            .getByRole('link', { name: 'Proceed To Checkout' })
            .click();
    }

    linkName(linkName: string) {
        return this.page.getByRole('link', { name: linkName });
    }
}