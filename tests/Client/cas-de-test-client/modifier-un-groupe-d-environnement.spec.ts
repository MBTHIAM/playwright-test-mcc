
import { test, expect } from '@playwright/test';
import { waitFor, loginsage } from '../../utils.ts';
import data3 from  "../jdd-pour-client/modifier-un-groupe-d-environnement.json";

test.beforeEach(async ({ page }) => {

  await loginsage(page); //login in sage
  await page.locator('a').filter({ hasText: 'Clients' }).click();
 
});

test.afterEach(async ({ page }) => {
 await waitFor(page); // Attendre 2 secondes
});


test.describe('Modifier un groupe d\'environnement', ()=>{

  //Modifier un groupe d'environnement
  test.skip('Modifier un groupe d\'environnement', async ({ page }) =>{

    await page.getByRole('textbox').fill(data3.NonClient);
    await waitFor(page); // Attendre 1 secondes
    await page.getByRole('cell', { name: data3['No Client'] }).click();
    await page.getByRole('tab', { name: 'Groupe d\'environnements' }).click();
    await page.getByText(data3.Nom1).click();
    await page.getByText('.NET MEMORY PROFILER').click({
      modifiers: ['ControlOrMeta']
    });
    await page.getByText('.NET', { exact: true }).click({
      modifiers: ['ControlOrMeta']
    });
    await page.getByRole('dialog').locator('a').first().click();
    await page.getByText(data3.Produit, { exact: true }).click({
      modifiers: ['ControlOrMeta']
    });
    await page.getByRole('dialog').locator('a').nth(1).click();
    await page.getByText('Enregistrer').click();
    await expect(page.getByText('Opération terminée avec succès')).toBeVisible();
    await page.getByRole('button', { name: 'Confirmer' }).click();

    });
  

    test('Modifier un groupe d\'environnement - validation des messages', async ({ page }) =>{
        
        await page.getByRole('textbox').fill(data3.NonClient1);
        await waitFor(page); // Attendre 1 secondes
        await page.getByRole('cell', { name: data3['No Client1']}).locator('a').click();
        await page.getByRole('tab', { name: 'Groupe d\'environnements' }).click();
        await page.getByText(data3.Nom2, { exact: true }).click();
        await page.getByText('JAVA', { exact: true }).click();
        await page.getByRole('dialog').locator('a').nth(1).click();
        await page.getByText('Enregistrer').click();
        //await expect(page.getByText('Opération terminée avec échec')).toBeVisible();
        await expect(page.getByText('Il y a des produits utilisés qui ne sont pas dans le groupe. Svp, ajoutez-le(s) pour continuer l\'enregistrement. JAVA')).toBeVisible();
        await page.getByRole('button', { name: 'OK' }).click();
        await page.getByText('Annuler').click();
        await page.getByText('Groupe', { exact: true }).click();
        await expect(page.getByText('JAVA', { exact: true })).toBeVisible();
        await page.getByRole('button', { name: 'Close' }).click();
        await page.getByLabel('Close').click();
    
        });
  

});