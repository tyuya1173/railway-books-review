import { test, expect } from '@playwright/test';

test.describe('Login Form Tests', () => {
    test('有効なメールアドレスとパスワード', async ({ page }) => {
        // ページをロードし、要素の表示を待機
        await page.goto('http://localhost:5173/components/Login/');
        await page.waitForSelector('input[name="email"]');

        // 入力フィールドに値を設定
        await page.fill('input[name="email"]', 'test@example.com');
        await page.fill('input[name="password"]', 'validPassword123');

        // フォームを送信
        await page.click('button[type="submit"]');

        // エラーメッセージが表示されないことを確認
        const emailError = await page.locator('.email-error');
        const passwordError = await page.locator('.password-error');

        await expect(emailError).toBeHidden();
        await expect(passwordError).toBeHidden();
    });

    test('不正なメールアドレス、パスワード', async ({ page }) => {
        // ページをロードし、要素の表示を待機
        await page.goto('http://localhost:5173/components/Login/');
        await page.waitForSelector('input[name="email"]');

        // 入力フィールドに値を設定
        await page.fill('input[name="email"]', 'invalid-email');
        await page.fill('input[name="password"]', 'short');

        // フォームを送信
        await page.click('button[type="submit"]');

        // エラーメッセージが表示されることを確認
        const emailError = await page.locator('.email-error');
        const passwordError = await page.locator('.password-error');

        await expect(emailError).toBeVisible();
        await expect(passwordError).toBeVisible();
    });
});
