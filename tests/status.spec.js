import { test, expect } from '@playwright/test'
import StartPage from './pages/StartPage.js'
import MainPage from './pages/MainPage.js'
import StatusesPage from './pages/StatusesPage.js'
import * as constants from './utils/constants.js'

let startPage
let mainPage
let statusesPage

test.beforeEach(async ({ page }) => {
  startPage = new StartPage(page)
  await startPage.goto()
  await startPage.login()
  mainPage = new MainPage(page)
  await mainPage.openStatusesList()
  statusesPage = new StatusesPage(page)
})

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('Positive Tests', () => {
  test('open form for new status', async ({ page }) => {
    await statusesPage.openNewStatusForm()
    await statusesPage.waitForStatusForm()
  })

  test('create status', async ({ page }) => {
    await statusesPage.createStatus()
    await statusesPage.checkResultForNewStatus()
    await statusesPage.checkNewStatusData()
  })

  test('check statuses list', async ({ page }) => {
    await statusesPage.checkStatusesList()
  })

  test('edit status', async ({ page }) => {
    await statusesPage.checkStatusDataBefore()
    await statusesPage.editStatus()
    await statusesPage.checkEditedStatusData()
  })

  test('delete status on list page', async ({ page }) => {
    await statusesPage.putOnCheckboxForStatus()
    await statusesPage.deleteStatus()
    await statusesPage.checkStatusAfterDelete()
  })

  test('delete ALL statuses in list', async ({ page }) => {
    await statusesPage.putOnCheckboxForAllStatuses()
    await statusesPage.checkAllCheckboxesAfterPut()
    await statusesPage.deleteStatus()
    await statusesPage.checkStatusesAfterDelete()
  })
})
