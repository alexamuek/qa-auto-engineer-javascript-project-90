import { test, expect } from '@playwright/test'
import StartPage from './pages/StartPage.js'

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('Positive Tests', () => {
  test('init', async ({ page }) => {
    const startPage = new StartPage(page)
    await startPage.goto()
    await startPage.waitForStartForm()
  })
})

