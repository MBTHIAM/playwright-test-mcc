
import { test, expect } from '@playwright/test';
import { waitFor, loginsage } from './utils';


test.beforeEach(async ({ page }) => {

  await loginsage(page); // Attendre 2 secondes

});

test.afterEach(async ({ page }) => {
 // await waitFor(page); // Attendre 2 secondes
});

//test de navigation sur conseiller
test.skip('test', async ({ page }) => {
  await page.locator('a').filter({ hasText: 'Conseillers' }).click();
  await waitFor(page); // Attendre 2 secondes
  await page.getByRole('textbox').fill('Askri');
  await waitFor(page); // Attendre 2 secondes
  await page.getByRole('cell', { name: 'Askri' }).locator('a').click();
  await waitFor(page); // Attendre 2 secondes
  await page.getByRole('tab', { name: 'Formations' }).click();
  await waitFor(page); // Attendre 2 secondes
  await page.getByRole('tab', { name: 'Perfectionnements' }).click();
  await waitFor(page); // Attendre 2 secondes
  await page.getByRole('tab', { name: 'Sommaire' }).click();
  await waitFor(page); // Attendre 2 secondes
  await page.getByRole('tab', { name: 'Employeurs' }).click();
  await waitFor(page); // Attendre 2 secondes
  await page.getByRole('tab', { name: 'Projets' }).click();
  await waitFor(page); // Attendre 2 secondes
  await page.getByRole('tab', { name: 'Mandats' }).click();
  await waitFor(page); // Attendre 2 secondes
  await page.getByRole('tab', { name: 'Lignes d\'affaires/Rôles' }).click();
  await page.getByText('Annuler').click();
  await page.locator('a').first().click();
});