import { test, expect } from '@playwright/test';
import { waitFor, loginsage } from '../../utils.ts';
import data3 from  "../jdd-pour-client/modifier-un-client.json";

test.beforeEach(async ({ page }) => {

  await loginsage(page); //login in sage
  await page.locator('a').filter({ hasText: 'Clients' }).click();
});

test.afterEach(async ({ page }) => {
 await waitFor(page); // Attendre 2 secondes
});


test.describe('Créer Client', ()=>{

  //Créer un client
  test('Création d\'un nouveau client ', async ({ page }) =>{

    await page.getByRole('textbox').click();
    await page.getByRole('textbox').fill(data3['No client']);
    await waitFor(page); // Attendre 2 secondes
    await page.getByRole('cell', { name: data3['No client'] }).locator('a').click();
    await page.getByPlaceholder('Nom...').click();
    await page.getByPlaceholder('Nom...').fill(data3['Non client initial'] + ' du ');
    await page.getByPlaceholder('Nom...').press('CapsLock');
    await page.getByPlaceholder('Nom...').fill(data3['Non client initial'] + ' du Q');
    await page.getByPlaceholder('Nom...').press('CapsLock');
    await page.getByPlaceholder('Nom...').fill(data3['Non client initial']+' du Québec');
    await page.getByPlaceholder('Nom abrégé').click();
    await page.getByPlaceholder('Nom abrégé').fill(data3['Non Abrégé initial']);
    await page.getByPlaceholder('Nom abrégé').press('CapsLock');
    await page.getByPlaceholder('Nom abrégé').fill(data3['Non Abrégé initial']+'Q');
    await page.getByPlaceholder('Nom abrégé').press('CapsLock');
    await page.getByText('Enregistrer').click();
    await expect(page.getByText('Opération terminée avec succès')).toBeVisible();
    await page.getByPlaceholder('Nom...').click();
    await page.getByPlaceholder('Nom...').fill(data3['Non client initial']);
    await page.getByPlaceholder('Nom abrégé').click();
    await page.getByPlaceholder('Nom abrégé').fill(data3['Non Abrégé initial']);
    await page.getByText('Enregistrer').click();
    await expect(page.getByText('Opération terminée avec succès')).toBeVisible();
    await page.getByLabel('Close').click();

    });
  
  

    

});