import test, { Locator, Page, expect } from "@playwright/test";
import { CollectionPage } from "../../src/pages/dashboard/collection.page";
import { CreateCollection } from "../../src/pages/dashboard/collection-child.page";
import { LoginPage } from "../../src/pages/authentication/login-page.page";
import { DashBoard } from "../../src/pages/dashboard/dashboard.page";


test('test_create_collections', async ({ page, context }) => {
    const loginPage = new LoginPage(page);
    const collectionPage = new CollectionPage(page);
    const createCollection = new CreateCollection(page);

    //Login Page
    await test.step('Login Page', async () => {
        await loginPage.login();
        await loginPage.page.waitForTimeout(3 * 1000);
    })

    //Chọn menu Product -> Collection
    await test.step('Chọn Collection', async () => {

        await collectionPage.navigateToMenu("Products");
        await collectionPage.navigateToMenu("Collections");
        await page.waitForTimeout(3 * 1000);
    })
    //Click btn Create Collection
    await test.step('Click btn Create Collection', async () => {
        await collectionPage.clickBtnCreateCollection();
        await page.waitForTimeout(3 * 1000);

    })
    //Create Collection
    await test.step('Create Collection', async () => {
        await createCollection.createCollection();
        await page.waitForTimeout(3 * 1000);

    })
    //Add Product to Collection
    await test.step('Add Product to Collection', async () => {
        await createCollection.addProductToCollection();
        await page.waitForTimeout(3 * 1000);
    })
    //--------------------------------------------------------------------------------------------------
    //Verify collection
    await test.step('Verify collection', async () => {
        await createCollection.verifyCollection(context);
    })
})