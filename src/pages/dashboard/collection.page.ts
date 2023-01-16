import { test, Locator, Page } from "@playwright/test";
import { LoginPage } from "../authentication/login-page.page";
import { DashBoard } from "./dashboard.page";

export class CollectionPage extends DashBoard {
    constructor(page: Page) {
        super(page);
    }



    async clickBtnCreateCollection() {
        await this.page.click("//span[normalize-space()='Create collection']");
        await this.page.waitForTimeout(5 * 1000);
    }

}