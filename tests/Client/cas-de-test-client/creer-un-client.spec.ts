import { test, expect } from '@playwright/test';
import { waitFor, loginsage } from '../../utils.ts';
import data3 from  "../jdd-pour-client/creer-un-client.json";

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
    await page.getByRole('textbox').fill(data3['Non client']);
    await expect(page.locator('div').filter({ hasText: /^«»$/ })).toBeVisible();
    await expect(page.locator('app-scs-grille')).toContainText('Liste de clients : 0');
    await page.locator('#zone-contenu a').first().click();
    await page.getByPlaceholder('Nom...').fill(data3['Non client']);
    await page.getByPlaceholder('Nom abrégé').fill(data3['Non Abrégé']);
    await page.getByLabel('Systematix').check();
    await page.getByText('Enregistrer').click();
    await expect(page.getByText('Client ajouté avec succès')).toBeVisible();
   // await page.getByLabel('Close').click();
    await expect(page.locator('tbody')).toContainText(data3['Non client']);
    await expect(page.locator('tbody')).toContainText(data3['Non Abrégé']);
    await expect(page.getByTitle('Consulter')).toBeVisible();
    await page.getByTitle('Consulter').click();
    await expect(page.getByPlaceholder('Nom...')).toHaveValue(data3['Non client']);
    await expect(page.getByPlaceholder('Nom abrégé')).toHaveValue(data3['Non Abrégé']);
    await expect(page.getByPlaceholder('No client...')).toBeVisible;
    await page.getByLabel('Close').click();


    });
  
  

    

});