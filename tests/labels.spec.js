import { test, expect } from '@playwright/test'
import StartPage from './pages/StartPage.js'
import MainPage from './pages/MainPage.js'
import LabelsPage from './pages/LabelsPage.js'
import * as constants from './utils/constants.js'

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
  test('open form for new label', async ({ page }) => {
    await labelsPage.openNewLabelForm()
    await labelsPage.waitForLabelForm()
  })

  test('create label', async ({ page }) => {
    await labelsPage.createLabel()
    await labelsPage.checkResultForNewLabel()
    await labelsPage.checkNewLabelData()
  })

  test('check labels list', async ({ page }) => {
    await labelsPage.checkLabelsList()
  })

  test('edit label', async ({ page }) => {
    await labelsPage.checkLabelDataBefore()
    await labelsPage.editLabel()
    await labelsPage.checkEditedLabelData()
  })

  test('delete label on list page', async ({ page }) => {
    await labelsPage.putOnCheckboxForLabel()
    await labelsPage.deleteLabel()
    await labelsPage.checkLabelAfterDelete()
  })

  test('delete ALL labels in list', async ({ page }) => {
    await labelsPage.putOnCheckboxForAllLabels()
    await labelsPage.checkAllCheckboxesAfterPut()
    await labelsPage.deleteLabel()
    await labelsPage.checkLabelsAfterDelete()
  })
})
