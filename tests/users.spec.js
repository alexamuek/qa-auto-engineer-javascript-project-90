import { test } from '@playwright/test'
import StartPage from './pages/StartPage.js'
import MainPage from './pages/MainPage.js'
import UsersPage from './pages/UsersPage.js'
import { userToDelete, userToEdit, wrongEmailToPut1, wrongEmailToPut2, wrongEmailToPut3 } from '../__fixtures__/data.js'

let startPage
let mainPage
let usersPage

test.beforeEach(async ({ page }) => {
  startPage = new StartPage(page)
  await startPage.gotoLoginPage()
  await startPage.login()
  mainPage = new MainPage(page)
  await mainPage.openUsersList()
  usersPage = new UsersPage(page)
})

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('Positive Tests', () => {
  test('open form for new user', async () => {
    await usersPage.openCreateForm()
    await usersPage.waitForUserForm()
  })

  test('create user', async () => {
    await usersPage.createUser()
    await usersPage.checkMessageForNewObj()
    await usersPage.checkNewUserData()
  })

  test('check users list', async () => {
    await usersPage.checkUsersList()
  })

  test('edit user', async () => {
    await usersPage.checkUserDataBefore()
    await usersPage.editUser()
    await usersPage.checkMessageForUpdatedObj()
    await usersPage.checkEditedUserData()
  })

  test('delete user on list page', async () => {
    await usersPage.putOnCheckboxForUser()
    await usersPage.delete()
    await usersPage.checkMessageForDeletedObj()
    await usersPage.checkUserAfterDelete()
  })

  test('delete user on profile page', async () => {
    await usersPage.openUserProfile(userToDelete)
    await usersPage.delete()
    await usersPage.checkUserAfterDelete()
  })

  test('delete ALL users in list', async () => {
    await usersPage.deleteAllItems()
    await usersPage.checkUsersAfterDelete()
  })
})

test.describe('Negative Tests', () => {
  test('edit user - put the emptiness', async () => {
    await usersPage.openUserProfile(userToEdit)
    await usersPage.fillOutUserFields('','','')
    await usersPage.save()
    await usersPage.expectErrorMessage()
    await usersPage.expectRequiredMessage()
  })

  test('edit user - put wrong email - without @ ', async () => {
    await usersPage.openUserProfile(userToEdit)
    await usersPage.fillOutUserFields(wrongEmailToPut1,'','')
    await usersPage.save()
    await usersPage.expectErrorMessage()
    await usersPage.expectEmailFormatMessage()
  })

  test('edit user - put wrong email - without first part ', async () => {
    await usersPage.openUserProfile(userToEdit)
    await usersPage.fillOutUserFields(wrongEmailToPut2,'','')
    await usersPage.save()
    await usersPage.expectErrorMessage()
    await usersPage.expectEmailFormatMessage()
  })

  test('edit user - put wrong email - without domain ', async () => {
    await usersPage.openUserProfile(userToEdit)
    await usersPage.fillOutUserFields(wrongEmailToPut3,'','')
    await usersPage.save()
    await usersPage.expectErrorMessage()
    await usersPage.expectEmailFormatMessage()
  })
})
