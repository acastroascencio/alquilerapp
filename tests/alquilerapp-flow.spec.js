import { expect, test } from '@playwright/test';

test('mantiene modulos independientes de alquiler y gastos mensuales', async ({ page }) => {
  await page.goto('/alquiler');

  await expect(page.getByRole('heading', { name: /registro de inquilinos/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /^alquiler$/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /gastos mensuales/i })).toBeVisible();

  await page.getByLabel('Nombre completo').fill('Luis Mendoza');
  await page.getByLabel('Tipo de documento').selectOption('DNI');
  await page.getByLabel('Numero de documento').fill('87654321');
  await page.getByLabel('Telefono').fill('999 111 222');
  await page.getByLabel('Correo').fill('luis.mendoza@email.com');
  await page.getByLabel('Inmueble alquilado').fill('Av. Brasil 456');
  await page.getByLabel('Monto de alquiler').fill('1500');
  await page.getByLabel('Monto de garantia').fill('1500');
  await page.getByRole('button', { name: /guardar inquilino/i }).click();

  await expect(page.getByText('Luis Mendoza')).toBeVisible();
  await expect(page.getByText('Av. Brasil 456')).toBeVisible();

  await page.getByRole('link', { name: /gastos mensuales/i }).click();
  await expect(page.getByRole('heading', { name: /gastos personales/i })).toBeVisible();
  await expect(page.locator('.monthly-summary').getByText('US$ 370')).toBeVisible();

  await page.getByLabel('Monto').fill('300');
  await page.getByLabel('Concepto').fill('Colegio');
  await page.getByLabel('Fecha').fill('2026-05-20');
  await page.getByRole('button', { name: /guardar gasto mensual/i }).click();

  await expect(page.getByText('Colegio')).toBeVisible();
  await expect(page.locator('.monthly-summary').getByText('US$ 670')).toBeVisible();
  await expect(page.getByText('Luis Mendoza')).toHaveCount(0);
});
