import { test, expect } from '@playwright/test';
import { waitFor, loginsage } from '../utils.ts';
import data8 from  "../Conseiller/conseiller.json";

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

    
    test('Modifier une perfectionnemen', async ({ page }) =>{
    await page.getByText(data8.Titre8).click();
    await page.getByPlaceholder('Année d\'obtention...').fill(data8.Date8);
    await page.getByText('Enregistrer').click();
    await expect(page.locator('ngb-toast')).toContainText('Perfectionnement modifié avec succès');
    await expect(page.getByLabel('Perfectionnements').locator('tbody')).toContainText(data8.Date8);
    await expect(page.getByLabel('Perfectionnements').locator('tbody')).toContainText(data8.Titre8);
    await expect(page.getByLabel('Perfectionnements').locator('tbody')).toContainText(data8.Institution8);
    await page.getByLabel('Close').click();
  
      });
    
        
  });
