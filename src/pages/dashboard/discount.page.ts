import { test, Locator, Page } from "@playwright/test";
import { LoginPage } from "../authentication/login-page.page";
import { DashBoard } from "./dashboard.page";

export class DiscountPage extends DashBoard {
    constructor(page:Page){
        super(page);
    }

    async clickBtnCreateDiscount(){
        await this.page.click("//span[normalize-space()='Create discount']");
        await this.page.waitForTimeout(5 * 1000);
    }
    
}