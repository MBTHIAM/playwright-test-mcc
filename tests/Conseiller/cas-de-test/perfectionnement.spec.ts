import { test, expect } from '@playwright/test';
import { waitFor, loginsage } from '../../utils.ts';
import data8 from  "../jdd/perfectionnement.json";

test.beforeEach(async ({ page }) => {

  await loginsage(page); //login in sage
  await page.locator('a').filter({ hasText: 'Conseillers' }).click();
  await page.getByRole('textbox').fill(data8.numeroconseiller8);
  await page.getByRole('cell', { name:data8.numeroconseiller8}).locator('a').click();
  await page.getByRole('tab', { name: 'Perfectionnements' }).click();
});

test.afterEach(async ({ page }) => {
 // await waitFor(page); // Attendre 2 secondes
});


test.describe('test sur perfectionnement', ()=>{

    
    test.skip('Modifier une perfectionnement', async ({ page }) =>{
    await page.getByText(data8.Titre8).click();
    await page.getByPlaceholder('Année d\'obtention...').fill(data8.Date8);
    await page.getByText('Enregistrer').click();
    await expect(page.locator('ngb-toast')).toContainText('Perfectionnement modifié avec succès');
    await expect(page.getByLabel('Perfectionnements').locator('tbody')).toContainText(data8.Date8);
    await expect(page.getByLabel('Perfectionnements').locator('tbody')).toContainText(data8.Titre8);
    await expect(page.getByLabel('Perfectionnements').locator('tbody')).toContainText(data8.Institution8);
    await page.getByLabel('Close').click();
  
      });
    

      test('Supprimer une perfectionnement', async ({ page }) =>{
       await page.getByRole('row', { name: data8.datatest9 }).getByRole('checkbox').check();
       await page.locator('.w-5 > .btn').first().click();
       await expect(page.locator('#swal2-content')).toContainText('Êtes-vous certain de vouloir supprimer ce(s) perfectionnement(s)?');
       await page.getByRole('button', { name: 'Confirmer' }).click();
       await page.getByText('Perfectionnement(s) supprimée').click();
       
      
      });
        

      test.skip('Supprimer plusieurs perfectionnements', async ({ page }) =>{

      const dm = data8.n;
      for (let i = 1; i <= dm; i++) {
        await page.locator('input[name="selection"]').nth(i).check();
        }
       await page.locator('.scs-disposition > app-scs-grille > div > div > .col-md-2 > div > a').click();
       await expect(page.locator('#swal2-content')).toContainText('Êtes-vous certain de vouloir supprimer ce(s) perfectionnement(s)?');
       await page.getByRole('button', { name: 'Confirmer' }).click();
      
      });
  });
