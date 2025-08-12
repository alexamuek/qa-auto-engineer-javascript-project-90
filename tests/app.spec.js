import { test } from '@playwright/test'
import StartPage from './pages/StartPage.js'
import MainPage from './pages/MainPage.js'

let startPage
let mainPage

test.beforeEach(async ({ page }) => {
  startPage = new StartPage(page)
  await startPage.gotoLoginPage()
})

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('Positive Tests for Start Page', () => {
  test('init', async () => {
    await startPage.waitForStartForm()
  })
})

test.describe('Positive Tests for Main Page', () => {
  test.beforeEach(async ({ page }) => {
    await startPage.login()
    mainPage = new MainPage(page)
  })

  test('login', async () => {
    await mainPage.waitForPageElements()
  })

  test('logout', async () => {
    await mainPage.openCurrentUserProfile()
    await mainPage.logout()
    await mainPage.checkLogoutElement()
    await startPage.waitForStartForm()
  }) 
})

