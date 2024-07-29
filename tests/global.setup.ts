/*
import { test, expect } from '@playwright/test';

test('login setup', async ({ page }) => { 

  await page.goto('https://sdw16.scs.systematix-qc.com:5304/sageui/auth');
  await page.locator('a').click();
  await page.getByPlaceholder('someone@example.com').fill('mbaye.thiam@systematix-qc.com');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByPlaceholder('Password').fill('Saliou87!');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('button', { name: 'No' }).click();
  
  await page.context().storageState({path: "./playwright/.auth/auth.json"})
})

*/
