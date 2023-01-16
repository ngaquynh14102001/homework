import test, { Locator, Page, expect } from "@playwright/test";
import { DiscountPage } from "../../src/pages/dashboard/discount.page";
import { CreateDiscountCode } from "../../src/pages/dashboard/discount-child.page";
import { LoginPage } from "../../src/pages/authentication/login-page.page";
import { DashBoard } from "../../src/pages/dashboard/dashboard.page";
import { CheckOutProduct } from "../../src/pages/dashboard/checkout-discountcode.page";

test('test_create_discountcode', async ({ page, context }) => {
    const loginPage = new LoginPage(page);
    const createDiscountCode = new CreateDiscountCode(page);
    const discountPage = new DiscountPage(page);
    const checkoutProduct = new CheckOutProduct(page);

    await test.step('Login Page', async () => {
        await loginPage.login();
        await page.waitForTimeout(5 * 1000);
    });

    await test.step('Chon Discounts', async () => {
        await discountPage.navigateToMenu("Discounts");
        await discountPage.navigateToMenu("Discounts");
        await page.waitForTimeout(3 * 1000);
    })

    await test.step('Click button Create Discount', async () => {
        await discountPage.clickBtnCreateDiscount();
        await page.waitForTimeout(3 * 1000);
    })

    await test.step('Create Discount Code', async () => {
        await createDiscountCode.createDiscountCode();
        await page.waitForTimeout(3 * 1000);
    })

    await test.step('Verify discount code', async () => {
        await page.goto("https://16-clothing.onshopbase.com/admin/discounts")
        await page.waitForTimeout(3 * 1000);
        await createDiscountCode.verifyDiscountCode();
        await page.waitForTimeout(3 * 1000);
    })
    await test.step('Checkout Product with discount code', async () => {
        await checkoutProduct.buyProduct();
        await checkoutProduct.fillInfo();
        await checkoutProduct.fillShipping();
        await checkoutProduct.fillPayment();

    })
    await test.step('Update DiscountCode', async () => {
        await page.goto("https://16-clothing.onshopbase.com/admin/discounts")
        await page.waitForTimeout(3 * 1000);
        await createDiscountCode.updateDisountCode('OCG_2023_TALENT');
    })
    await test.step('Verify Status Discount Code Updated', async () => {
        await createDiscountCode.verifyStatusDiscountCodeUpdate();
    })
})