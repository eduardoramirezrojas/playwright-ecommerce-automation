import { Locator, Page } from "@playwright/test";

export class ThanksPage {

    readonly page : Page;
    readonly thanksMessage : Locator;
    readonly shopAgainButton : Locator;

    constructor(page : Page) {
        this.page = page;
        this.thanksMessage = this.page.getByText('Thank You for Your Order');
        this.shopAgainButton  = this.page.getByTestId('shop-again-btn');
    }
}
