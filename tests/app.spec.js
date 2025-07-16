import { test, expect } from '@playwright/test'
import StartPage from './pages/StartPage.js'
import MainPage from './pages/MainPage.js'

let startPage

test.beforeEach(async ({ page }) => {
  startPage = new StartPage(page)
  await startPage.goto()
})

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('Positive Tests', () => {
  test('init', async ({ page }) => {
    await startPage.waitForStartForm()
  })

  test('login', async ({ page }) => {
    await startPage.login()
    const mainPage = new MainPage(page)
    await mainPage.waitForControls()
  })

  test('logout', async ({ page }) => {
    await startPage.login()
    const mainPage = new MainPage(page)
    await mainPage.openProfile()
    await mainPage.logout()
    await mainPage.checkLogoutControl()
    await startPage.waitForStartForm()
  }) 
})

