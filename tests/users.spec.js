import { test, expect } from '@playwright/test'
import StartPage from './pages/StartPage.js'
import MainPage from './pages/MainPage.js'
import UsersPage from './pages/UsersPage.js'
import * as constants from './utils/constants.js'

let startPage
let mainPage
let usersPage

test.beforeEach(async ({ page }) => {
  startPage = new StartPage(page)
  await startPage.goto()
  await startPage.login()
  mainPage = new MainPage(page)
  await mainPage.openUsersList()
  usersPage = new UsersPage(page)
})

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('Positive Tests', () => {
  test('create user', async ({ page }) => {
    await usersPage.createUser()
    await usersPage.checkResultForNewUser()
    await usersPage.checkNewUserData()
  })

  test('check users list', async ({ page }) => {
    await usersPage.checkUsersList()
  })

  test('edit user', async ({ page }) => {
    await usersPage.editUserProfile()
    await usersPage.checkEditedUserData()
  })

  test('delete user on list page', async ({ page }) => {
    await usersPage.putOnCheckboxForUser()
    await usersPage.deleteUser()
    await usersPage.checkUserAfterDelete()
  })

  test('delete user on profile page', async ({ page }) => {
    await usersPage.openUserProfile(constants.userToDelete)
    await usersPage.deleteUser()
    await usersPage.checkUserAfterDelete()
  })

  test('delete ALL users in list', async ({ page }) => {
    await usersPage.putOnCheckboxForAllUsers()
    await usersPage.checkAllCheckboxesAfterPut()
    await usersPage.deleteUser()
    await usersPage.checkUsersAfterDelete()
  })
})

test.describe('Negative Tests', () => {
  test('edit user - put the emptiness', async ({ page }) => {
    await usersPage.openUserProfile(constants.userToEdit)
    await usersPage.fillOutUserFields('','','')
    await usersPage.saveUserProfile()
    await usersPage.expectErrorMessage()
    await usersPage.expectRequiredMessage()
  })

  test('edit user - put wrong email - without @ ', async ({ page }) => {
    await usersPage.openUserProfile(constants.userToEdit)
    await usersPage.fillOutUserFields(constants.wrongEmailToPut1,'','')
    await usersPage.saveUserProfile()
    await usersPage.expectErrorMessage()
    await usersPage.expectEmailFormatMessage()
  })

  test('edit user - put wrong email - without first part ', async ({ page }) => {
    await usersPage.openUserProfile(constants.userToEdit)
    await usersPage.fillOutUserFields(constants.wrongEmailToPut2,'','')
    await usersPage.saveUserProfile()
    await usersPage.expectErrorMessage()
    await usersPage.expectEmailFormatMessage()
  })

  test('edit user - put wrong email - without domain ', async ({ page }) => {
    await usersPage.openUserProfile(constants.userToEdit)
    await usersPage.fillOutUserFields(constants.wrongEmailToPut3,'','')
    await usersPage.saveUserProfile()
    await usersPage.expectErrorMessage()
    await usersPage.expectEmailFormatMessage()
  })
})
