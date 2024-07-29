import { test, expect } from '@playwright/test';
import { waitFor, loginsage } from '../utils.ts';
import data6 from  "../Conseiller/conseiller.json";

test.beforeEach(async ({ page }) => {

  await loginsage(page); //login in sage
  await page.locator('a').filter({ hasText: 'Conseillers' }).click();
  await page.getByRole('textbox').fill(data6.Nom6);
  await expect(page.locator('tbody')).toContainText(data6.Nom6);
  await expect(page.locator('tbody')).toContainText(data6.Prenom6);
  await expect(page.locator('tbody')).toContainText(data6.numeroconseiller6);
  await page.getByRole('cell', { name:data6.numeroconseiller6}).locator('a').click();
  await page.getByRole('tab', { name: 'Formations' }).click();
});

test.afterEach(async ({ page }) => {
 await waitFor(page); // Attendre 2 secondes
 await page.getByLabel('Close').click();
 await waitFor(page); // Attendre 2 secondes
});


test.describe('Supprimer formation', ()=>{

    
    test('Supprimer une formation', async ({ page }) =>{
      await page.locator('input[name="selection"]').first().check();
      await page.locator('.w-5 > .btn').first().click();
      await expect(page.locator('#swal2-content')).toContainText('Êtes-vous certain de vouloir supprimer ce(s) formation(s)?');
      await page.getByRole('button', { name: 'Confirmer' }).click();
      await expect(page.locator('ngb-toast')).toContainText('Formation(s) supprimée(s) avec succès');
      

      });

    test.skip('Supprimer plusieurs formations', async ({ page }) =>{
      await page.locator('input[name="selection"]').first().check();
      await page.locator('input[name="selection"]').nth(1).check();
      await page.locator('input[name="selection"]').nth(2).check();
      await page.locator('.scs-disposition > .scs-disposition > div > div > .col-md-2 > div > a').click();
      await page.getByRole('button', { name: 'Confirmer' }).click();
      await expect(page.locator('ngb-toast')).toContainText('Formation(s) supprimée(s) avec succès');

      });
    

  });
