import { Locator, Page, expect } from "@playwright/test";
import { DiscountPage } from "./discount.page";

export class CheckOutProduct{
    page: Page;
    btnBuyNow: Locator;
    inputEmail: Locator;
    inputFirstName: Locator;
    inputLastName: Locator;
    inputAddress: Locator;
    inputAddressZip: Locator;
    zipOptionCity: Locator;
    comboboxCountry: Locator;
    optionCountry: Locator;
    phoneNumber: Locator;
    inputDiscountCode: Locator;
    btnApply: Locator;
    btnCountinueToShip: Locator;
    btnCountinuePayment: Locator;
    inputCardNumber: Locator;
    inputCardholder: Locator;
    inputMMYY: Locator;
    inputCVV: Locator;
    btnCompleteOrder: Locator;

    constructor(page:Page){
        this.page = page;
        this.btnBuyNow = page.locator("//span[normalize-space()='Buy Now']");
        this.inputEmail = page.locator("//input[@id='checkout_shipping_address_email']");
        this.inputFirstName = page.locator("//input[@id='checkout_shipping_address_first_name']")
        this.inputLastName = page.locator("//input[@id='checkout_shipping_address_last_name']");
        this.inputAddress = page.locator("//input[@id='checkout_shipping_address_address_line1']");
        this.inputAddressZip = page.locator("//input[@id='checkout_shipping_address_zip']");
        this.zipOptionCity = page.locator("//span[@class='zip-option__city']");
        this.comboboxCountry = page.locator("//input[@id='checkout_shipping_address_country_name']");
        this.optionCountry = page.locator("//div[@class='pt4 absolute s-select-searchable__container']//div[@value='US']");
        this.phoneNumber = page.locator("//input[@id='checkout_shipping_address_phone']");
        this.inputDiscountCode = page.locator("//input[@placeholder='Enter your promotion code']");
        this.btnApply = page.locator("//button[@class='s-button field__input-btn']");
        this.btnCountinueToShip = page.locator("//button[@type='submit']");
        this.btnCountinuePayment = page.locator("//button[@class='s-button step__continue-button']");
        this.inputCardNumber = page.locator('//div[@class="fieldset stripe-form test-gateway"]').frameLocator('//div[@id="stripe-card-number"]//iframe').locator('[placeholder="Card number"]');
        this.inputCardholder = page.locator("//input[@placeholder='Cardholder name']");
        this.inputMMYY = page.locator('//div[@class="fieldset stripe-form test-gateway"]').frameLocator("//div[@id='stripe-card-expiry']//iframe").locator('[placeholder="MM/YY"]');
        this.inputCVV = page.locator('//div[@class="fieldset stripe-form test-gateway"]').frameLocator("//div[@id='stripe-card-cvc']//iframe").locator('[placeholder="CVV"]');
        this.btnCompleteOrder = page.locator("//button[@class='s-button step__continue-button']");
    }
    async buyProduct(){
        await this.page.goto("https://16-clothing.onshopbase.com/collections/mobile-phone/products/iphone-14-pro-max-128gb-nga-4");
        await this.page.waitForTimeout(3 * 1000);

        await this.btnBuyNow.click();
        await this.page.waitForTimeout(3 * 1000);

    }
    async fillInfo(){
        await this.inputEmail.fill("ngaquynh141001@gmail.com");
        await this.inputFirstName.fill("ABC");
        await this.inputLastName.fill("EFG");
        await this.inputAddress.fill("Hồng Bàng, HP");
        await this.inputAddressZip.fill("10001");
        await this.zipOptionCity.click();
        await this.comboboxCountry.click();
        await this.optionCountry.click();
        await this.phoneNumber.fill("0924050925");
        await this.inputDiscountCode.fill("OCG_2023_TALENT");
        await this.btnApply.click();
        await this.btnCountinueToShip.click();
        await this.page.waitForTimeout(3 * 1000);

    }
    async fillShipping(){
        await  this.btnCountinuePayment.click();
        await this.page.waitForTimeout(3 * 1000);


    }
    async fillPayment(){
        await this.inputCardNumber.fill("4242424242424242");
        await this.inputCardholder.fill("Nga Quynh");
        await this.inputMMYY.fill("0326");
        await this.inputCVV.fill("111");
        await this.btnCompleteOrder.click();
        await this.page.waitForTimeout(3 * 1000);

    }
}
    
