
import { test, expect } from '@playwright/test';

test('@Regression End to End flow', async ({ page }) => {

    // Navigate to SauceDemo
    await page.goto('https://www.saucedemo.com/');

    // Login
    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();

    // Verify login
    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toHaveText('Products');

    // Sort by price: high to low
    await page.locator('.product_sort_container')
        .selectOption({ label: 'Price (high to low)' });

    // Verify sorting
    const prices = await page.locator('.inventory_item_price')
        .allTextContents();

    const numericPrices = prices.map(price =>
        Number(price.replace('$', ''))
    );

    expect(numericPrices).toEqual(
        [...numericPrices].sort((a, b) => b - a)
    );

    // Add Sauce Labs Fleece Jacket to cart
    const product = page.locator('.inventory_item')
        .filter({ hasText: 'Sauce Labs Fleece Jacket' });

    await product.getByRole('button', {
        name: 'Add to cart'
    }).click();

    // Verify cart badge
    await expect(
        page.locator('.shopping_cart_badge')
    ).toHaveText('1');

    // Open cart
    await page.locator('.shopping_cart_link').click();

    // Verify cart
    await expect(page).toHaveURL(/cart/);
    await expect(page.locator('.cart_item')).toHaveCount(1);
});