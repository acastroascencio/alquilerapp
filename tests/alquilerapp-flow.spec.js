import { expect, test } from '@playwright/test';

test('ejecuta el flujo del manual: login, contrato y gasto', async ({ page }) => {
  await page.goto('/login');

  await expect(page.getByRole('heading', { name: /inicia sesion/i })).toBeVisible();
  await page.getByLabel('Email').fill('user_mcastro@alquilerapp.test');
  await page.getByLabel('Contrasena').fill('demo123');
  await page.getByRole('button', { name: /ingresar/i }).click();

  await expect(page.getByRole('heading', { name: /panel de propiedades/i })).toBeVisible();
  await expect(page.getByText('user_mcastro - GESTOR')).toBeVisible();

  const primaryButton = page.getByRole('link', { name: /gestionar contrato/i }).first();
  await expect(primaryButton).toBeVisible();
  await primaryButton.click();

  await expect(page).toHaveURL(/\/property\/1$/);
  await expect(page.getByRole('heading', { name: /generar contrato/i })).toBeVisible();
  await page.getByLabel('Arrendatario').fill('Carlos Renteria');
  await page.getByLabel('Arrendador').fill('Mario Castro');
  await page.getByLabel('Renta mensual').fill('800');
  await page.getByLabel('Deposito inicial').fill('800');
  await page.getByRole('button', { name: /generar contrato y actualizar estado/i }).click();

  await expect(page.getByText(/contrato creado/i)).toBeVisible();
  await page.getByRole('status').getByRole('link', { name: /registrar gasto/i }).click();

  await expect(page.getByRole('heading', { name: /registrar gasto/i })).toBeVisible();
  await page.getByLabel('Contrato de alquiler').selectOption('lease_prop_dummy_123');
  await page.getByLabel('Categoria').selectOption('Servicios');
  await page.getByLabel('Monto').fill('120');
  await page.getByLabel('Detalle').fill('Servicio de luz');
  await page.getByRole('button', { name: /guardar gasto/i }).click();

  await expect(page.getByText(/gasto registrado/i)).toBeVisible();
  await page.getByRole('link', { name: /propiedades/i }).click();
  await expect(page.getByRole('heading', { name: /panel de propiedades/i })).toBeVisible();

  const cardBackground = await page.locator('.property-card').first().evaluate((element) => {
    return window.getComputedStyle(element).backgroundColor;
  });
  expect(cardBackground).not.toBe('rgba(0, 0, 0, 0)');
});
