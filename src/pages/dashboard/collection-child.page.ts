import { Locator, Page, expect } from "@playwright/test";
import { DashBoard } from "./dashboard.page";
import { CollectionPage } from "./collection.page";

export class CreateCollection extends CollectionPage {
    inputCollectionName: Locator;
    collectionType: Locator;
    btnSaveCollection: Locator;
    btnAddProduct: Locator;
    inputSearchProduct: Locator;
    checkboxProduct: Locator;
    btnSaveAddProduct: Locator;
    constructor(page: Page) {
        super(page);
        this.inputCollectionName = page.locator("//input[@placeholder='e.g Summer collection, Under $100, Staff picks']");
        this.collectionType = page.locator("//div[contains(@class,'col-md-8 col-xs-12')]//div[1]//label[1]//span[1]");
        this.btnSaveCollection = page.locator("//span[normalize-space()='Save']");
        this.btnAddProduct = page.locator("//button[normalize-space() = 'Add product' ]");
        this.inputSearchProduct = page.locator("[placeholder^=Search]");
        this.checkboxProduct = page.locator("//div[@class='item-list']//div[1]//div[1]//label[1]//span[1]");
        this.btnSaveAddProduct = page.locator("//div[contains(@class,'s-modal-footer')]//span[contains(@class,'s-flex s-flex--align-center')][normalize-space()='Save']");
    }

    async createCollection() {
        await this.inputCollectionName.fill("Mobile phone1");
        await this.collectionType.click();
        await this.btnSaveCollection.click();
    }
    async addProductToCollection() {
        await this.btnAddProduct.click();
        await this.inputSearchProduct.fill("iPhone 14 Pro Max 128GB - Nga");
        await this.page.waitForTimeout(5*1000);
        await this.checkboxProduct.click();
        await this.btnSaveAddProduct.click();
    }

    async verifyCollection(context) {
        const [collectionStorefrontPage] = await Promise.all([
            context.waitForEvent("page"), // chờ sự kiện để ra tab mới
            await this.page.click("//i[@class='mdi mdi-eye mdi-18px']"), //hành động gây ra sự kiện
        ]);
        await collectionStorefrontPage.waitForTimeout(3*1000);
        const productInCollection = await collectionStorefrontPage.locator("//span[@title='iPhone 14 Pro Max 128GB - Nga']").textContent();

        await collectionStorefrontPage.waitForTimeout(3 * 1000);

        expect(productInCollection).toEqual('iPhone 14 Pro Max 128GB - Nga');
    }
}