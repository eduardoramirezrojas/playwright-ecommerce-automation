import { Locator, Page } from "@playwright/test";

export class ConfirmPage {

    readonly page: Page;
    readonly placeOrderButton : Locator;

    constructor(page: Page) {
        this.page = page;
        this.placeOrderButton = this.page.getByTestId('place-order-btn');
    }

    async dataCheck(dataTestId: string) : Promise<string> {

        return this.page
            .getByTestId(dataTestId)
            .innerText();
    }

    linkName(linkName: string) {
        return this.page.getByRole('link', { name: linkName });
    }


};