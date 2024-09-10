import { test, expect } from '@playwright/test';
import { waitFor, loginsage } from '../../utils.ts';
import data3 from  "../jdd-pour-client/ajouter-un-groupe-d-environnement.json";

test.beforeEach(async ({ page }) => {

  await loginsage(page); //login in sage
  await page.locator('a').filter({ hasText: 'Clients' }).click();
});

test.afterEach(async ({ page }) => {
 await waitFor(page); // Attendre 2 secondes
});


test.describe('Ajouter Groupe d\'environnement', ()=>{

  //Ajouter Groupe d'environnement
  test('Ajouter Groupe d\'environnement', async ({ page }) =>{

  await page.getByRole('textbox').fill(data3.NonClient);
  await waitFor(page); // Attendre 1 secondes
  await page.getByRole('cell', { name: data3['No Client1'] }).click();
  await page.getByRole('tab', { name: 'Groupe d\'environnements' }).click();
  await page.locator('app-liste-groupe-environnement > app-scs-grille > div > div > .col-md-2 > div > a').first().click();
  await page.getByPlaceholder('Nom...').fill(data3.Nom);
  await page.getByPlaceholder('Rechercher...').first().fill('Access');
  await page.getByText('ACCESS', { exact: true }).click({
    modifiers: ['ControlOrMeta']
  });
  await page.getByText('ACCESS 2', { exact: true }).click({
    modifiers: ['ControlOrMeta']
  });
  await page.getByText('ACCESS 2.0').click({
    modifiers: ['ControlOrMeta']
  });
  await page.getByRole('dialog').locator('a').first().click();
  await waitFor(page); // Attendre 1 secondes
  await page.getByPlaceholder('Rechercher...').first().click();
  await page.getByPlaceholder('Rechercher...').first().fill(data3['Produit débuter par ']);
  await page.getByText('PL/PGSQL').scrollIntoViewIfNeeded();
  await page.getByText('PACBASE').scrollIntoViewIfNeeded();
  await waitFor(page); // Attendre 1 secondes
  await page.getByPlaceholder('Rechercher...').first().fill(data3.Produit);
  await waitFor(page); // Attendre 1 secondes
  await page.getByText('PHOTOSHOP', { exact: true }).click();
  await page.getByRole('dialog').locator('a').first().click();
  await page.getByText('Enregistrer').click();
  await expect(page.getByText('Opération terminée avec succès')).toBeVisible();
  await expect(page.getByText('Groupe ajouté avec succès')).toBeVisible();
  await page.getByText('Groupe ajouté avec succès').click();
  await expect(page.getByText(data3.Nom)).toBeVisible();
  await page.getByLabel('Close').click();

    });
  
  

});