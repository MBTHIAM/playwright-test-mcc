import { test, expect } from '@playwright/test';
import { waitFor, loginsage } from '../../utils.ts';
import data8 from "../jdd/sommair.json";


test.beforeEach(async ({ page }) => {

  await loginsage(page); //login in sage
  await page.locator('a').filter({ hasText: 'Conseillers' }).click();
  await page.getByRole('textbox').fill(data8.numéroconseiller11);
  await page.getByRole('cell', { name:data8.numéroconseiller11}).locator('a').click();
  await page.getByRole('tab', { name: 'Sommaire' }).click();
});

test.afterEach(async ({ page }) => {
 // await waitFor(page); // Attendre 2 secondes
});


test.describe('Sommaire', ()=>{
    
    test('Ajouter un sommaire', async ({ page }) =>{
    await page.getByPlaceholder('Description...').click();
    await page.getByPlaceholder('Description...').fill(data8.Description);
    await page.getByText('Enregistrer').click();
    await expect(page.getByText('Sommaire modifé avec succès')).toBeVisible();
    await page.getByLabel('Close').click();
      });
   
  });
