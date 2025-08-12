import { test } from '@playwright/test'
import StartPage from './pages/StartPage.js'
import MainPage from './pages/MainPage.js'
import StatusesPage from './pages/StatusesPage.js'

let startPage
let mainPage
let statusesPage

test.beforeEach(async ({ page }) => {
  startPage = new StartPage(page)
  await startPage.gotoLoginPage()
  await startPage.login()
  mainPage = new MainPage(page)
  await mainPage.openStatusesList()
  statusesPage = new StatusesPage(page)
})

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('Positive Tests', () => {
  test('open form for new status', async () => {
    await statusesPage.openCreateForm()
    await statusesPage.waitForStatusForm()
  })

  test('create status', async () => {
    await statusesPage.createStatus()
    await statusesPage.checkMessageForNewObj()
    await statusesPage.checkNewStatusData()
  })

  test('check statuses list', async () => {
    await statusesPage.checkStatusesList()
  })

  test('edit status', async () => {
    await statusesPage.checkStatusDataBefore()
    await statusesPage.editStatus()
    await statusesPage.checkMessageForUpdatedObj()
    await statusesPage.checkEditedStatusData()
  })

  test('delete status on list page', async () => {
    await statusesPage.putOnCheckboxForStatus()
    await statusesPage.delete()
    await statusesPage.checkMessageForDeletedObj()
    await statusesPage.checkStatusAfterDelete()
  })

  test('delete ALL statuses in list', async () => {
    await statusesPage.deleteAllItems()
    await statusesPage.checkStatusesAfterDelete()
  })
})
