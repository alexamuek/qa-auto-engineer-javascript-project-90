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
  test('open form for new user', async ({ page }) => {
    await usersPage.openCreateForm()
    await usersPage.waitForUserForm()
  })

  test('create user', async ({ page }) => {
    await usersPage.createUser()
    await usersPage.checkMessageForNewObj()
    await usersPage.checkNewUserData()
  })

  test('check users list', async ({ page }) => {
    await usersPage.checkUsersList()
  })

  test('edit user', async ({ page }) => {
    await usersPage.checkUserDataBefore()
    await usersPage.editUser()
    await usersPage.checkMessageForUpdatedObj()
    await usersPage.checkEditedUserData()
  })

  test('delete user on list page', async ({ page }) => {
    await usersPage.putOnCheckboxForUser()
    await usersPage.delete()
    await usersPage.checkMessageForDeletedObj()
    await usersPage.checkUserAfterDelete()
  })

  test('delete user on profile page', async ({ page }) => {
    await usersPage.openUserProfile(constants.userToDelete)
    await usersPage.delete()
    await usersPage.checkUserAfterDelete()
  })

  test('delete ALL users in list', async ({ page }) => {
    await usersPage.deleteAllItems()
    await usersPage.checkUsersAfterDelete()
  })
})

test.describe('Negative Tests', () => {
  test('edit user - put the emptiness', async ({ page }) => {
    await usersPage.openUserProfile(constants.userToEdit)
    await usersPage.fillOutUserFields('','','')
    await usersPage.save()
    await usersPage.expectErrorMessage()
    await usersPage.expectRequiredMessage()
  })

  test('edit user - put wrong email - without @ ', async ({ page }) => {
    await usersPage.openUserProfile(constants.userToEdit)
    await usersPage.fillOutUserFields(constants.wrongEmailToPut1,'','')
    await usersPage.save()
    await usersPage.expectErrorMessage()
    await usersPage.expectEmailFormatMessage()
  })

  test('edit user - put wrong email - without first part ', async ({ page }) => {
    await usersPage.openUserProfile(constants.userToEdit)
    await usersPage.fillOutUserFields(constants.wrongEmailToPut2,'','')
    await usersPage.save()
    await usersPage.expectErrorMessage()
    await usersPage.expectEmailFormatMessage()
  })

  test('edit user - put wrong email - without domain ', async ({ page }) => {
    await usersPage.openUserProfile(constants.userToEdit)
    await usersPage.fillOutUserFields(constants.wrongEmailToPut3,'','')
    await usersPage.save()
    await usersPage.expectErrorMessage()
    await usersPage.expectEmailFormatMessage()
  })
})
