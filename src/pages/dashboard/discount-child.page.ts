import { Locator, Page, expect } from "@playwright/test";
import { DashBoard } from "./dashboard.page";
import { DiscountPage } from "./discount.page";

export class CreateDiscountCode extends DiscountPage {
    inputDiscountCode: Locator;
    inputDiscountValue: Locator;
    radioSpecificProducts: Locator;
    btnBrowse: Locator;
    inputSearchProducts: Locator;
    checkboxProductDiscount: Locator;
    btnSaveSelectProducts: Locator;
    btnSaveChanges: Locator;
    oclock: Locator;
    startDate: Locator;
    confirmDate: Locator;

    constructor(page: Page) {
        super(page);
        this.inputDiscountCode = page.locator("//input[@placeholder='e.g. SUMMERSALE']");
        this.inputDiscountValue = page.locator("//input[@placeholder='0']");
        this.radioSpecificProducts = page.locator("//span[normalize-space()='Specific products']");
        this.btnBrowse = page.locator("//div[@class='select-product-component s-mt16']//span[@class='s-flex s-flex--align-center'][normalize-space()='Browse']")
        this.inputSearchProducts = page.locator("//input[@placeholder='Search for product']");
        this.checkboxProductDiscount = page.locator("//body/div[@id='app']/div[@class='unite-ui-frame vertical-screen']/main[@class='s-mb96 unite-ui-dashboard__main menu-expand']/div[@class='m-t-ex container padding-for-select-plan-bar']/div/div[@class='discount-detail-page']/div[@class='row']/div[@class='col-xs-12 col-sm-8']/form[@class='s-form']/div[@class='section s-mt24']/div[@class='section-body s-flex s-flex--vertical s-mt4']/div[@class='select-product-component s-mt16']/div[@class='s-modal is-active modal-select-product modal-select-item']/div[@class='s-modal-wrapper']/div[@class='s-animation-content s-modal-content']/div[@class='s-modal-body']/div[@class='item-list']/div[1]/div[1]/label[1]/span[1]");
        this.btnSaveSelectProducts = page.locator("//div[@class='s-modal-footer']//span[@class='s-flex s-flex--align-center'][normalize-space()='Save']");
        this.btnSaveChanges = page.locator("//span[normalize-space()='Save changes']");

        this.oclock = page.locator("//i[contains(@class,'mdi mdi-clock-outline mdi-18px')]");
        this.startDate = page.locator("//span[normalize-space()='19']");
        this.confirmDate = page.locator("//span[normalize-space()='Confirm']");
    }

    async createDiscountCode() {
        await this.inputDiscountCode.fill("OCG_2023_TALENT");
        await this.inputDiscountValue.fill("10");
        await this.radioSpecificProducts.click();
        await this.btnBrowse.click();
        await this.inputSearchProducts.fill("iPhone 14 Pro Max 128GB - Nga");
        await this.page.waitForTimeout(3*1000);
        await this.checkboxProductDiscount.click();
        await this.btnSaveSelectProducts.click();
        await this.page.waitForTimeout(3*1000);
        await this.btnSaveChanges.click();
        await this.page.waitForTimeout(3*1000);


    }

    async verifyDiscountCode() {
        const discountCode = await this.page.locator(" //span[normalize-space()='OCG_2023_TALENT']").textContent();
        expect(discountCode).toEqual('OCG_2023_TALENT');
    }

    async updateDisountCode(code: string) {
        await this.page.click(`//span[normalize-space()='${code}']`);
        await this.oclock.click();
        await this.startDate.click();
        await this.confirmDate.click();
        await this.page.waitForTimeout(5 * 1000);
    }
    async verifyStatusDiscountCodeUpdate() {
        const statusDiscount = await this.page.locator("//p[contains(@class,'text-capitialize')][normalize-space()='Scheduled']").textContent()
        await this.page.waitForTimeout(2 * 1000);
    }
}


