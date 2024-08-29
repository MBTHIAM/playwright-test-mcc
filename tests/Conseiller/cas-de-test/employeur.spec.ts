import { test, expect } from '@playwright/test';
import { waitFor, loginsage } from '../../utils.ts';
import data8 from  "../jdd/employeur.json";

test.beforeEach(async ({ page }) => {

  await loginsage(page); //login in sage
  await page.locator('a').filter({ hasText: 'Conseillers' }).click();
  await page.getByRole('textbox').fill(data8.numéroconseiller12);
  await page.getByRole('cell', { name:data8.numéroconseiller12}).locator('a').click();
  await page.getByRole('tab', { name: 'Employeurs' }).click();
});

test.afterEach(async ({ page }) => {
 // await waitFor(page); // Attendre 2 secondes
});


test.describe('Sommaire', ()=>{
    
  test.skip('Ajouter un employeur', async ({ page }) =>{
    await page.getByLabel('Employeur', { exact: true }).selectOption(data8.SelectionEmpoyeur12);
    await page.getByLabel('Date début (aaaa-mm)').fill(data8['Date de début']);
    await page.getByLabel('Date fin (aaaa-mm)').dblclick;
    await page.getByLabel('Date fin (aaaa-mm)').fill('2006-06');
    await page.getByLabel('Date fin (aaaa-mm)').fill(data8['Date de fin']);
    await page.getByPlaceholder('Nb mois...').click();
    await expect(page.getByPlaceholder('Nb mois...')).toBeVisible();
    await page.getByPlaceholder('Titre...').fill(data8.Titre12);
    await page.getByText('Enregistrer').click();
    await expect(page.getByText('Employeur ajouté avec succès')).toBeVisible();
    await expect(page.getByLabel('Employeurs').locator('tbody')).toContainText(data8['Nom de employeur']);
    await expect(page.getByLabel('Employeurs').locator('tbody')).toContainText(data8['Date de début']);
    await expect(page.getByLabel('Employeurs').locator('tbody')).toContainText(data8['Date de fin']);
    await expect(page.getByLabel('Employeurs').locator('tbody')).toContainText(data8.Titre12);

      });

  test.skip('Ajouter un employeur - validation erreur', async ({ page }) =>{
    await page.getByText('Enregistrer').click();
    await expect(page.getByText('L\'employeur est obligatoire')).toBeVisible();
    await expect(page.getByText('Le titre est obligatoire')).toBeVisible();
    await page.getByLabel('Close').click();

     });


  test('Supprimer un employeur', async ({ page }) =>{
    
      await page.getByTitle('Supprimer').nth(1).click();
      await page.getByRole('button', { name: 'Confirmer' }).click();
      await expect(page.getByText('Employeur(s) supprimé(s) avec')).toBeVisible();
      
       });
   
  test('Supprimer plusieur employeurs', async ({ page }) =>{

    const dm = data8.m;
    for (let i = 1; i <= dm; i++) {
      await page.locator('input[name="selection"]').nth(i).check();
      }
    await page.locator('.col-md-2 > div > .ng-star-inserted').click();
    await page.getByRole('button', { name: 'Confirmer' }).click();
    await expect(page.getByText('Employeur(s) supprimé(s) avec')).toBeVisible();
    await page.getByLabel('Close').click();

         });
     
  });
