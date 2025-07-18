import { test, expect } from '@playwright/test'
import StartPage from './pages/StartPage.js'
import MainPage from './pages/MainPage.js'
import UsersPage from './pages/UsersPage.js'
import * as constants from './utils/constants.js'

let startPage
let mainPage

test.beforeEach(async ({ page }) => {
  startPage = new StartPage(page)
  await startPage.goto()
  await startPage.login()
  mainPage = new MainPage(page)
  await mainPage.openUsersList()
})

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('Positive Tests', () => {
  test('create user', async ({ page }) => {
    const usersPage = new UsersPage(page)
    await usersPage.createUser()
    await usersPage.checkResultForNewUser()
    await usersPage.checkNewUserData()
  })

  test('check users list', async ({ page }) => {
    const usersPage = new UsersPage(page)
    await usersPage.checkUsersList()
  })

  test('edit user', async ({ page }) => {
    const usersPage = new UsersPage(page)
    await usersPage.editUserProfile()
    await usersPage.checkEditedUserData()
  })
})
