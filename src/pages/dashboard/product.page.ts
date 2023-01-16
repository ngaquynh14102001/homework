import test, { Locator, Page, expect } from "@playwright/test";
import { DashBoard } from "./dashboard.page";

export class ProductPage extends DashBoard {
    titleProduct: Locator;
    priceProduct: Locator;
    comparePrice: Locator;
    btnAddVariantn: Locator;
    variantOption: Locator;
    variantOptionValues: Locator;
    btnSaveChanges: Locator;
    constructor(page: Page) {
        super(page);
        this.titleProduct = page.locator('//input[@placeholder="Short Sleeve T-Shirt"]');
        this.priceProduct = page.locator('//input[@id="price"]');
        this.comparePrice = page.locator('//input[@id="compare_price"]');
        this.btnAddVariantn = page.locator('//a[@class="pull-right"]');
        this.variantOption = page.locator('//input[@id="option-name"]');
        this.variantOptionValues = page.locator('//input[@placeholder="Separate options with comma"]');
        this.btnSaveChanges = page.locator('//button[@class="btn btn-primary"]');
    }

    async clickBtnCreateProduct() {
        await this.page.getByText("Add product").click();
    }

    async createProduct() {
        await this.titleProduct.fill('iPhone 14 Pro Max 128GB - Nga');
        await this.priceProduct.fill('10000');
        await this.comparePrice.fill('12000');
        await this.btnAddVariantn.click();
        await this.variantOption.fill('color');
        await this.variantOptionValues.fill('Space black,Silver,Gold,Deep Purple,');
        await this.btnSaveChanges.click();
        await this.page.waitForTimeout(5 * 1000);
    }

    async verifyProduct({ context }) {
        const [productStorefrontPage] = await Promise.all([
            context.waitForEvent("page"), // chờ sự kiện để ra tab mới
            await this.page.click('//i[@class="mdi mdi-eye mdi-18px d-flex"]'), //hành động gây ra sự kiện
        ]);
        await this.page.waitForTimeout(3 * 1000);
        await productStorefrontPage.waitForLoadState("networkidle"); //load ra page

        //verify title product
        const productTitle = await productStorefrontPage.locator('//h1[@class = "h4 d-block product__name mt0 mb12 product__name-product"]').textContent();
        expect(productTitle).toEqual('iPhone 14 Pro Max 128GB - Nga');

        //verify price product
        const priceProduct = await productStorefrontPage.locator('//span[@class="h4 product__price-span mr8 mb0"]').textContent();
        expect(priceProduct).toEqual('$10,000.00');

        //verify campare price
        const comparePrice = await productStorefrontPage.locator("//del[normalize-space()='$12,000.00']").textContent();
        expect(comparePrice).toEqual('$12,000.00');

        //verify option variant
        const optionLocators = await productStorefrontPage.locator('//button[contains(@class, "product__option")]').all();

        const createdOptions = ['Space black', 'Silver', 'Gold', 'Deep Purple'];
        for (let i = 0; i < optionLocators.length; i++) {
            const optionText = await optionLocators[i].textContent();
            expect(optionText).toEqual(createdOptions[i]);
            console.log(optionText);
        }

    }
    async deleteNewProduct(){
        // await this.page.goto("https://16-clothing.onshopbase.com/admin/products?sort_field=id&sort_mode=desc&tab=all&page=1&published_status=any");
        await this.page.click("(//span[contains(text(),'iPhone 14 Pro Max 128GB - Nga')])[1]");
        await this.page.click("//span[normalize-space()='Delete product']");
        await this.page.waitForTimeout(5*1000);
    }
}