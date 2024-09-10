import { test, expect } from '@playwright/test';
import { waitFor, loginsage } from '../../utils.ts';
import data3 from  "../jdd-pour-client/supprimer-client.json";

test.beforeEach(async ({ page }) => {

  await loginsage(page); //login in sage
  await page.locator('a').filter({ hasText: 'Clients' }).click();
});

test.afterEach(async ({ page }) => {
 await waitFor(page); // Attendre 2 secondes
});


test.describe('Supprimer', ()=>{

  //Supprimer un client existant
  test.skip('Supprimer un client existant', async ({ page }) =>{

 await page.getByRole('textbox').fill(data3.NonClientSupprimer);
 await waitFor(page); // Attendre 2 secondes
 await page.locator('a').filter({ hasText: data3['No Client'] }).click();
 await page.locator('app-scs-groupe-form a').click();
 await page.getByRole('button', { name: 'Confirmer' }).click();
 await expect(page.locator('ngb-toast')).toContainText('Client supprimé avec succès');

    });
  
  
  //Supprimer un client - Validation des messages d'erreurs
  test('Supprimer un client - Validation des messages d\'erreurs', async ({ page }) =>{

    await page.getByRole('textbox').fill(data3.NonClientSupprimer1);
    await waitFor(page); // Attendre 2 secondes
    await page.locator('a').filter({ hasText: data3['No Client1'] }).click();
    await page.locator('app-scs-groupe-form a').click();
    await page.getByRole('button', { name: 'Confirmer' }).click();
    await expect(page.getByText('Impossible de supprimer le')).toBeVisible();
    await page.getByRole('button', { name: 'OK' }).click();
   
  });   

});