import { test, expect } from '@playwright/test';
import { waitFor, loginsage } from '../utils.ts';
import data3 from  "../Conseiller/conseiller.json";

test.beforeEach(async ({ page }) => {

  await loginsage(page); //login in sage

});

test.afterEach(async ({ page }) => {
 await waitFor(page); // Attendre 2 secondes
});


test.describe('Recherche Conseiller', ()=>{

  //Rechercher un conseiller existant
  test('Rechercher un conseiller existant', async ({ page }) =>{
  await page.locator('a').filter({ hasText: 'Conseillers' }).click();
  await page.locator('.ng-arrow-wrapper').click();
  await page.getByRole('option', { name: 'Archivé' }).click();
  await page.locator('.ng-arrow-wrapper').click();
  await page.getByRole('option', { name: 'Actif' }).click();
  await page.getByRole('textbox').fill(data3.Nom3);
  await expect(page.locator('tbody')).toContainText(data3.Nom3);
  await expect(page.locator('tbody')).toContainText(data3.Prenom3);
  await expect(page.locator('tbody')).toContainText(data3.numeroconseiller3);
  await page.getByRole('cell', { name:data3.numeroconseiller3}).locator('a').click();
  await page.getByLabel('Close').click();
  await page.locator('a').first().click();
    });
  
  
  //Rechercher un conseiller inexistant
  test('Rechercher un conseiller inexistant', async ({ page }) => {
  await page.locator('a').filter({ hasText: 'Conseillers' }).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill('Bob');
  await expect(page.locator('app-scs-grille')).toContainText('«»');
      });

    

});


    