
import data1 from "../testdata/login.json"

export const waitFor = async (page, timeout = 2000) => {
    await page.waitForTimeout(timeout);
  };

  export const loginsage = async (page) => {
    await page.goto('https://sdw16.scs.systematix-qc.com:5304/sageui/auth');
    await page.locator('a').click();
    await page.getByPlaceholder('someone@example.com').fill(data1["someone@example.com"]);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.getByPlaceholder('Password').fill(data1.Password);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.getByRole('button', { name: 'No' }).click();
  };