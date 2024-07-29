
import { test, expect } from '@playwright/test';
import { waitFor, loginsage } from '../utils.ts';
import data2 from  "../Conseiller/conseiller.json";

test.beforeEach(async ({ page }) => {

  await loginsage(page); //login in sage

});

test.afterEach(async ({ page }) => {
 // await waitFor(page); // Attendre 2 secondes
});


test.describe('Création dun nouveau conseiller', ()=>{

test('Ajouter un conseiller existant - Validation des messages derreurs', async ({ page }) => {
  await page.locator('a').filter({ hasText: 'Conseillers' }).click();
  await page.locator('.col-md-2 > div > a').click();
  await page.getByPlaceholder('No...').fill(data2.numeroconseillerexiste);
  //await page.getByText('Ajout conseiller×').click();
  await page.getByText('Enregistrer').click();
  await expect(page.locator('form')).toContainText('Le nom est obligatoire');
  await expect(page.locator('form')).toContainText('Le prénom est obligatoire');
  await expect(page.locator('form')).toContainText('Le sexe est obligatoire');
  await expect(page.locator('form')).toContainText('Il faut préciser au moins une langue');
  await page.getByPlaceholder('Nom...', { exact: true }).fill(data2.Nom);
  await page.getByPlaceholder('Prénom...').fill(data2.Prenom);
  await page.locator('.col-md-4 > .ng-select > .ng-select-container > .ng-arrow-wrapper').first().click();
  await page.getByRole('option', { name: 'Masculin' }).click();
  await page.getByLabel('Parlé').first().check();
  await page.getByLabel('Écrit').first().check();
  await page.getByText('Enregistrer').click();
  await expect(page.locator('#swal2-content')).toContainText('Ce numéro de conseiller existe déjà.');
  await page.getByRole('button', { name: 'OK' }).click();
  await waitFor(page); // Attendre 2 secondes
  await page.getByPlaceholder('No...').fill(data2.numeroconseiller);
  await page.getByText('Enregistrer').click();
  await expect(page.locator('#swal2-content')).toContainText('Un conseiller avec le même nom/prénom existe déjà.');
  await expect(page.locator('#swal2-content')).toContainText('Enregistrer quand même ?');
  await page.getByText('Enregistrer quand même ?').click();
  await page.getByRole('button', { name: 'Confirmer' }).click();
  await page.locator('input[name="termeRecherche"]').fill(data2.Nom);
  await expect(page.locator('tbody')).toContainText(data2.Nom);
  await expect(page.locator('tbody')).toContainText(data2.Prenom);
  await expect(page.locator('tbody')).toContainText(data2.numeroconseiller);
  await page.locator('a').first().click();
});


test('Ajouter un conseiller inexistant  - Saisie des champs obligatoires seulement.', async ({ page }) => {
  await page.locator('a').filter({ hasText: 'Conseillers' }).click();
  await page.locator('.col-md-2 > div > a').click();
  await page.getByPlaceholder('No...').fill(data2.numeroconseiller1);
  await page.getByPlaceholder('Nom...', { exact: true }).fill(data2.Nom1);
  await page.getByPlaceholder('Prénom...').fill(data2.Prenom1);
  await page.locator('.col-md-4 > .ng-select > .ng-select-container > .ng-arrow-wrapper').first().click();
  await page.getByRole('option', { name: 'Masculin' }).click();
  await page.getByLabel('Parlé').first().check();
  await page.getByLabel('Écrit').first().check();
  await page.getByText('Enregistrer').click();
  await expect(page.getByRole('heading', { name: 'Opération terminée avec succès' })).toBeVisible();
  //await expect(page.getByRole('heading', { name: 'Conseiller ajouté avec succès' })).toBeVisible();
  await waitFor(page); // Attendre 2 secondes
  await expect(page.locator('tbody')).toContainText(data2.numeroconseiller1);
  await page.locator('a').first().click();
});

//Saisir tous les champs d'un conseiller en création
test('Saisir tous les champs dun conseiller en création', async ({ page }) => {
  await page.locator('a').filter({ hasText: 'Conseillers' }).click();
  await page.getByRole('textbox').click();
  await page.getByRole('textbox').fill(data2.numeroconseiller2);
  await waitFor(page); // Attendre 2 secondes
  await expect(page.locator('app-scs-grille')).toContainText('«»');
  await waitFor(page); // Attendre 2 secondes
  await page.locator('#zone-contenu a').first().click();
  await page.getByPlaceholder('No...').fill(data2.numeroconseiller2);
  await page.getByPlaceholder('Nom...', { exact: true }).fill(data2.Nom2);
  await page.getByPlaceholder('Prénom...').fill(data2.Prenom2);
  await page.getByPlaceholder('Particularité').fill(data2.Particularité);
  await page.locator('.col-md-4 > .ng-select > .ng-select-container > .ng-arrow-wrapper').first().click();
  await page.getByRole('option', { name: 'Masculin' }).click();
  await page.locator('#noMoisEvalAnnuelle > .ng-select-container > .ng-arrow-wrapper').click();
  await page.getByRole('option', { name: 'Janvier' }).click();
  await page.getByLabel('Parlé').first().check();
  await page.getByLabel('Écrit').first().check();
  await page.getByPlaceholder('Autres langues...').fill('Wolof');
  await page.getByText('Enregistrer').click();
  //condition a gérer ici si pupup de confirmation s'affiche
  await page.getByRole('button', { name: 'Confirmer' }).click();
  await expect(page.getByRole('heading', { name: 'Opération terminée avec succès' })).toBeVisible();
  //await expect(page.getByRole('heading', { name: 'Conseiller ajouté avec succès' })).toBeVisible();
  await expect(page.locator('tbody')).toContainText(data2.numeroconseiller2);
  await page.locator('a').first().click();
  });


  });