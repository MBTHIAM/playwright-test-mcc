import { test, expect } from '@playwright/test';
import { waitFor, loginsage } from '../../utils.ts';
import data3 from  "../jdd-pour-client/recherche-client.json";

test.beforeEach(async ({ page }) => {

  await loginsage(page); //login in sage
  await page.locator('a').filter({ hasText: 'Clients' }).click();
});

test.afterEach(async ({ page }) => {
 await waitFor(page); // Attendre 2 secondes
});


test.describe('Recherche Client', ()=>{

  //Rechercher un client existant
  test('Rechercher un client existant', async ({ page }) =>{

 await page.getByRole('textbox').fill(data3.NonClientRechercher);
 await expect(page.locator('app-scs-grille')).toContainText(data3.NombreClientAffiché1);
 await page.locator('.ng-arrow-wrapper').click();
 await page.getByRole('option', { name: 'Systematix' }).click();
 await expect(page.locator('app-scs-grille')).toContainText(data3.NombreClientAffiché2);
 await page.getByRole('cell', { name: data3['Non du ministère'] }).locator('a').click();
 await expect(page.getByPlaceholder('Nom...')).toHaveValue(data3['Non du ministère']);
 await expect(page.getByPlaceholder('Nom abrégé')).toHaveValue(data3.NonAbréger);
 await expect(page.getByPlaceholder('No client...')).toHaveValue(data3['Numéro du Cleint']);
 await page.getByText('Annuler').click();

    });
  
  
  //Rechercher un client inexistant
  test('Rechercher un client inexistant', async ({ page }) => {
    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill('Pharmaprix');
    await expect(page.locator('div').filter({ hasText: /^«»$/ })).toBeVisible();
    await expect(page.locator('app-scs-grille')).toContainText('Liste de clients : 0');
      });

    

});