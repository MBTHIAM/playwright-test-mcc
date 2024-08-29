import { test, expect } from '@playwright/test';
import { waitFor, loginsage } from '../../utils.ts';
import data4 from  "../jdd/formation.json";

test.beforeEach(async ({ page }) => {

  await loginsage(page); //login in sage
  await page.locator('a').filter({ hasText: 'Conseillers' }).click();
  await page.getByRole('textbox').fill(data4.Nom4);
  await expect(page.locator('tbody')).toContainText(data4.Nom4);
  await expect(page.locator('tbody')).toContainText(data4.Prenom4);
  await expect(page.locator('tbody')).toContainText(data4.numeroconseiller4);
  await page.getByRole('cell', { name:data4.numeroconseiller4}).locator('a').click();
  await page.getByRole('tab', { name: 'Formations' }).click();
});

test.afterEach(async ({ page }) => {
 // await waitFor(page); // Attendre 2 secondes
});


test.describe('formation', ()=>{

    //Ajouter une formation
    test('Ajouter une formation ', async ({ page }) =>{

    await page.getByPlaceholder('Nom du diplôme...').fill(data4['Nom du diplôme']);
    await page.getByPlaceholder('Institution...').fill(data4.Institution);
    await page.getByPlaceholder('Année d\'obtention...').fill(data4['Année dobtention']);
    await page.getByLabel('Type de formation').selectOption(data4['Type de formation']);
    await page.getByText('Enregistrer').click();
    //await expect(page.getByRole('heading', { name: 'Opération terminée avec succès' })).toBeVisible();
    //await expect(page.getByRole('heading', { name: 'Formation ajoutée avec succès' })).toBeVisible();
    await expect(page.getByLabel('Formations').locator('tbody')).toContainText(data4['Nom du diplôme']);
    await expect(page.getByLabel('Formations').locator('tbody')).toContainText(data4.Institution);
    await expect(page.getByLabel('Formations').locator('tbody')).toContainText(data4['Année dobtention']);
    await page.getByLabel('Close').click();
    await page.locator('a').first().click();
      });
    
    //Ajouter une formation - Validation des messages 
    test('Ajouter une formation- Validation des messages', async ({ page }) =>{
      
        await page.getByText('Enregistrer').click();
        await expect(page.locator('app-scs-groupe-form')).toContainText('Nom du diplômeLe nom du diplôme est obligatoire');
        await expect(page.locator('app-scs-groupe-form')).toContainText('InstitutionL\'institution est obligatoire');
        await expect(page.locator('app-scs-groupe-form')).toContainText('L\'année d\'obtention est obligatoire');
        await expect(page.locator('app-scs-groupe-form')).toContainText('Le type de formation est obligatoire');
        await page.getByPlaceholder('Nom du diplôme...').fill(data4['Nom du diplôme1']);
        await page.getByPlaceholder('Institution...').fill(data4.Institution1);
        await page.getByPlaceholder('Année d\'obtention...').fill('25');
        await expect(page.locator('app-scs-groupe-form')).toContainText('Année d\'obtentionL\'année d\'obtention n\'est pas valide');
        await page.getByPlaceholder('Année d\'obtention...').fill(data4['Année dobtention1']);
        await page.getByLabel('Type de formation').selectOption(data4['Type de formation1']);
        await page.getByText('Enregistrer').click();
        await expect(page.getByLabel('Formations').locator('tbody')).toContainText(data4['Nom du diplôme1']);
        await expect(page.getByLabel('Formations').locator('tbody')).toContainText(data4.Institution1);
        await expect(page.getByLabel('Formations').locator('tbody')).toContainText(data4['Année dobtention1']);
        await page.getByLabel('Close').click();
        await page.locator('a').first().click();
          });


    test('Supprimer une formation', async ({ page }) =>{

       await page.locator('input[name="selection"]').first().check();
       await page.locator('.w-5 > .btn').first().click();
       await expect(page.locator('#swal2-content')).toContainText('Êtes-vous certain de vouloir supprimer ce(s) formation(s)?');
       await page.getByRole('button', { name: 'Confirmer' }).click();
       await expect(page.locator('ngb-toast')).toContainText('Formation(s) supprimée(s) avec succès');
            
      
       });
      
  test.skip('Supprimer plusieurs formations', async ({ page }) =>{
            
      await page.locator('input[name="selection"]').first().check();
      await page.locator('input[name="selection"]').nth(1).check();
      await page.locator('input[name="selection"]').nth(2).check();
      await page.locator('.scs-disposition > .scs-disposition > div > div > .col-md-2 > div > a').click();
      await page.getByRole('button', { name: 'Confirmer' }).click();
      await expect(page.locator('ngb-toast')).toContainText('Formation(s) supprimée(s) avec succès');
      
        });
          
        
  });
