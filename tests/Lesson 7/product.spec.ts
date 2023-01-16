import test, { expect } from "@playwright/test";
import { LoginPage } from "../../src/pages/authentication/login-page.page";
import { DashBoard } from "../../src/pages/dashboard/dashboard.page";
import { ProductPage } from "../../src/pages/dashboard/product.page";

//--------------------------------------------------------------------------------------------------

test.beforeEach(async ({ page }) => {
    //Login Dashboard -> login page 
    const loginPage = new LoginPage(page);

    await loginPage.login();
    await loginPage.page.waitForTimeout(5 * 1000);
})

test('test_addproduct', async ({ page, context }) => {
    //Click button create product -> viết ở ProductPage
    const productPage = new ProductPage(page);
    await test.step('Click button create product', async () => {
        //Chọn menu product -> viết trong DashboardPage 
        await productPage.navigateToMenu("Products");
        await productPage.page.waitForTimeout(5 * 1000);
        await productPage.clickBtnCreateProduct();
        await productPage.page.waitForTimeout(5 * 1000);
    })
    //Create product
    await test.step('Create product', async () => {
        await productPage.createProduct();
        await productPage.page.waitForTimeout(5 * 1000);
    })

    //Verify new product
    await test.step('Verify new product', async () => {
        await productPage.verifyProduct({ context });
    })
})
test.afterEach(async ({page}) => {
    const productPage = new ProductPage(page);
    await productPage.navigateToMenu("Products");
    await productPage.page.waitForTimeout(5 * 1000);
    await productPage.deleteNewProduct();
})









    // test.afterEach(async ()=> {
    //     //delete product
    // })
