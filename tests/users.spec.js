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

  test('edit user - positive case', async ({ page }) => {
    const usersPage = new UsersPage(page)
    await usersPage.editUserProfile()
    await usersPage.checkEditedUserData()
  })

  test('delete user on list page', async ({ page }) => {
    const usersPage = new UsersPage(page)
    await usersPage.putOnCheckboxForUser()
    await usersPage.deleteUser()
    await usersPage.checkUserAfterDelete()
  })

  test('delete user on profile page', async ({ page }) => {
    const usersPage = new UsersPage(page)
    await usersPage.openUserProfile(constants.userToDelete)
    await usersPage.deleteUser()
    await usersPage.checkUserAfterDelete()
  })

  test('delete ALL users in list', async ({ page }) => {
    const usersPage = new UsersPage(page)
    await usersPage.putOnCheckboxForAllUser()
    await usersPage.deleteUser()
    await usersPage.checkUsersAfterDelete()
  })
})

test.describe('Negative Tests', () => {
  test('edit user - negative case - put the emptiness', async ({ page }) => {
    const usersPage = new UsersPage(page)
    await usersPage.openUserProfile()
    await usersPage.fillOutUserFields('','','')
    await usersPage.saveUserProfile()
    await usersPage.expectErrorMessage()
    await usersPage.expectRequiredMessage()
  })

  test('edit user - negative case - put wrong email - without @ ', async ({ page }) => {
    const usersPage = new UsersPage(page)
    await usersPage.openUserProfile()
    await usersPage.fillOutUserFields(constants.wrongEmailToPut1,'','')
    await usersPage.saveUserProfile()
    await usersPage.expectErrorMessage()
    await usersPage.expectEmailFormatMessage()
  })

  test('edit user - negative case - put wrong email - without first part ', async ({ page }) => {
    const usersPage = new UsersPage(page)
    await usersPage.openUserProfile()
    await usersPage.fillOutUserFields(constants.wrongEmailToPut2,'','')
    await usersPage.saveUserProfile()
    await usersPage.expectErrorMessage()
    await usersPage.expectEmailFormatMessage()
  })

  test('edit user - negative case - put wrong email - without domain ', async ({ page }) => {
    const usersPage = new UsersPage(page)
    await usersPage.openUserProfile()
    await usersPage.fillOutUserFields(constants.wrongEmailToPut3,'','')
    await usersPage.saveUserProfile()
    await usersPage.expectErrorMessage()
    await usersPage.expectEmailFormatMessage()
  })
})
