import { test } from '@playwright/test'
import StartPage from './pages/StartPage.js'
import MainPage from './pages/MainPage.js'
import LabelsPage from './pages/LabelsPage.js'

let startPage
let mainPage
let labelsPage

test.beforeEach(async ({ page }) => {
  startPage = new StartPage(page)
  await startPage.goto()
  await startPage.login()
  mainPage = new MainPage(page)
  await mainPage.openLabelsList()
  labelsPage = new LabelsPage(page)
})

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('Positive Tests', () => {
  test('open form for new label', async () => {
    await labelsPage.openCreateForm()
    await labelsPage.waitForLabelForm()
  })

  test('create label', async () => {
    await labelsPage.createLabel()
    await labelsPage.checkMessageForNewObj()
    await labelsPage.checkNewLabelData()
  })

  test('check labels list', async () => {
    await labelsPage.checkLabelsList()
  })

  test('edit label', async () => {
    await labelsPage.checkLabelDataBefore()
    await labelsPage.editLabel()
    await labelsPage.checkMessageForUpdatedObj()
    await labelsPage.checkEditedLabelData()
  })

  test('delete label on list page', async () => {
    await labelsPage.putOnCheckboxForLabel()
    await labelsPage.delete()
    await labelsPage.checkMessageForDeletedObj()
    await labelsPage.checkLabelAfterDelete()
  })

  test('delete ALL labels in list', async () => {
    await labelsPage.deleteAllItems()
    await labelsPage.checkLabelsAfterDelete()
  })
})
