import { test, expect } from '@playwright/test';
import { waitFor, loginsage } from '../../utils.ts';
import data3 from  "../jdd-pour-client/supprimer-un-groupe-d-environnement.json";

test.beforeEach(async ({ page }) => {

  await loginsage(page); //login in sage
  await page.locator('a').filter({ hasText: 'Clients' }).click();
 
});

test.afterEach(async ({ page }) => {
 await waitFor(page); // Attendre 2 secondes
});


test.describe('Supprimer un groupe d\'environnement', ()=>{

  //Modifier un groupe d'environnement
   test.skip('Supprimer un groupe d\'environnement', async ({ page }) =>{

       await page.getByRole('textbox').fill(data3.NonClient);
       await waitFor(page); // Attendre 1 secondes
       await page.getByRole('cell', { name: data3['No Client'] }).click();
       await page.getByRole('tab', { name: 'Groupe d\'environnements' }).click();
       await page.locator('app-liste-groupe-environnement > app-scs-grille > div > div > .col-md-2 > div > a').first().click();
       await page.getByPlaceholder('Nom...').fill('Application');
       await page.getByPlaceholder('Rechercher...').first().fill('ACROBAT PROFESIONAL');
       await page.getByText('ACROBAT PROFESIONAL').click();
       await page.getByRole('dialog').locator('a').first().click();
       await page.getByPlaceholder('Rechercher...').first().fill('GOOGLE ');
       await page.getByText('GOOGLE API').click();
       await page.getByRole('dialog').locator('a').first().click();
       await page.getByPlaceholder('Rechercher...').first().fill('GOOGLE');
       await page.getByText('GOOGLE MAPS API').click();
       await page.getByRole('dialog').locator('a').first().click();
       await page.getByPlaceholder('Rechercher...').first().fill('GPS');
       await page.getByText('GPS', { exact: true }).click();
       await page.getByRole('dialog').locator('a').first().click();
       await page.getByText('Enregistrer').click();
       await expect(page.getByText('Groupe ajouté avec succès')).toBeVisible();
       await page.locator('tr').filter({ hasText: 'Application3' }).locator('input[name="selection"]').check();
       await page.getByTitle('Supprimer').first().click();
       await expect(page.getByText('Êtes-vous certain de vouloir')).toBeVisible();
       await page.getByRole('button', { name: 'Confirmer' }).click();
       await expect(page.getByText('Groupe supprimé avec succès')).toBeVisible();
       await page.getByLabel('Close').click();


       });
  

    test.skip('Supprimer plusieurs groupe d\'environnement', async ({ page }) =>{
        
        await page.getByRole('textbox').fill(data3.NonClient);
        await waitFor(page); // Attendre 1 secondes
        await page.getByRole('cell', { name: data3['No Client'] }).locator('a').click();
        await page.getByRole('tab', { name: 'Groupe d\'environnements' }).click();
        await page.locator('app-liste-groupe-environnement > app-scs-grille > div > div > .col-md-2 > div > a').first().click();
        await page.getByPlaceholder('Nom...').fill('Application');
        await page.getByPlaceholder('Rechercher...').first().fill('ACROBAT PROFESIONAL');
        await page.getByText('ACROBAT PROFESIONAL').click();
        await page.getByRole('dialog').locator('a').first().click();
        await page.getByPlaceholder('Rechercher...').first().fill('GOOGLE ');
        await page.getByText('GOOGLE API').click();
        await page.getByRole('dialog').locator('a').first().click();
        await page.getByPlaceholder('Rechercher...').first().fill('GOOGLE');
        await page.getByText('GOOGLE MAPS API').click();
        await page.getByRole('dialog').locator('a').first().click();
        await page.getByPlaceholder('Rechercher...').first().fill('GPS');
        await page.getByText('GPS', { exact: true }).click();
        await page.getByRole('dialog').locator('a').first().click();
        await page.getByText('Enregistrer').click();
        await expect(page.getByText('Groupe ajouté avec succès')).toBeVisible();
        await page.locator('tr').filter({ hasText: 'Application3' }).locator('input[name="selection"]').check();
        await page.locator('tr').filter({ hasText: 'Microsoft2' }).locator('input[name="selection"]').check();
        await page.locator('.col-md-2 > div > a:nth-child(2)').click();
        await expect(page.getByText('Êtes-vous certain de vouloir supprimer ce(s) Groupe(s)?')).toBeVisible();
        await page.getByRole('button', { name: 'Confirmer' }).click();
        await expect(page.getByText('Groupe supprimé avec succès')).toBeVisible();
        await page.getByLabel('Close').click();
    
       
        });
    test('Supprimer un groupe d\'environnement-validation des messages', async ({ page }) =>{
        
        await page.getByRole('textbox').fill(data3.NonClient);
        await waitFor(page); // Attendre 1 secondes
        await page.getByRole('cell', { name: data3['No Client']}).locator('a').click();
        await page.getByRole('tab', { name: 'Groupe d\'environnements' }).click();
        await page.locator('input[name="selection"]').check();
        await page.getByTitle('Supprimer').click();
        await expect(page.getByText('Êtes-vous certain de vouloir')).toBeVisible();
        await page.getByRole('button', { name: 'Confirmer' }).click();
        await expect(page.getByText('Suppression Impossible, Il')).toBeVisible();
        await page.getByRole('button', { name: 'OK' }).click();
       
            
        
        });

});