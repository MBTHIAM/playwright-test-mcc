import { test, expect } from '@playwright/test';
import { waitFor, loginsage } from '../../utils.ts';
import data from  "../jdd/ligneaffaire.json";

test.beforeEach(async ({ page }) => {

  await loginsage(page); //login in sage
  await page.locator('a').filter({ hasText: 'Conseillers' }).click();
  await page.getByRole('textbox').fill(data['Numéro conseiller']);
  await page.getByRole('cell', { name:data['Numéro conseiller']}).locator('a').click();
  await page.getByRole('tab', { name: 'Lignes d\'affaires/Rôles' }).click();
});

test.afterEach(async ({ page }) => {
 // await waitFor(page); // Attendre 2 secondes
});


test.describe('test sur ligne d affaire', ()=>{

    test('Ajouter Lignes d affaires/Rôles principaux', async ({ page }) =>{

    await page.getByLabel(data['Ligne d\'affaire']).check();
    await page.getByLabel(data['Rôle principaux']).check();
    await page.getByRole('textbox').first().click();
    await page.getByRole('textbox').first().fill(data.Particularité);
    await page.getByText('Enregistrer').click();
    await expect(page.getByText('Lignes d\'affaire/Rôles')).toBeVisible();
    await expect(page.getByText('ajouté(s) avec succès')).toBeVisible();
    await page.getByLabel('Close').click();

      });
    

    test('Modifier/Supprimer- Lignes d\'affaires/Rôles principaux', async ({ page }) =>{

    await page.getByLabel(data['Ligne d\'affaire à décocher']).uncheck();
    await page.getByLabel(data['Rôle principaux à décocher']).uncheck();
    await page.getByLabel(data['Nouveau Rôle principaux à cocher']).check();
    await page.getByRole('textbox').first().fill(data['Particularité à ajouter au besoin']);
    await page.getByText('Enregistrer').click();
    await expect(page.getByText('Lignes d\'affaire/Rôles')).toBeVisible();
    await expect(page.getByText('ajouté(s) avec succès')).toBeVisible();
    await page.getByLabel('Close').click();
    
      });

  });
