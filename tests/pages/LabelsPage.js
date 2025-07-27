import { expect } from '@playwright/test'
import * as constants from '../utils/constants.js'

const pageEl = constants.pagesEl.labelsPage

export default class LabelsPage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page
    this.createLabelLink = page.getByRole('link', { name: pageEl.createLabel, exact: true })
    this.saveLabelButton = page.getByRole('button', { name: pageEl.labelSaveButtonLabel })
    this.nameInput = page.getByLabel(pageEl.nameInputLabel)
    this.deleteLabelButton = page.getByRole('button', { name: pageEl.deleteLabelButtonLabel })
    this.deleteAllCheckbox = page.getByRole('checkbox', { name: pageEl.deleteAllCheckboxLabel })
  }

  async openNewLabelForm() {
    await this.createLabelLink.click()
  }

  async waitForLabelForm() {
    await expect(this.saveLabelButton).toBeVisible()
    await expect(this.nameInput).toBeVisible()
  }

  async checkResultForNewLabel() {
    const resultMessage = this.page.getByText(pageEl.createLabelResultMessage)
    await expect(resultMessage).toBeVisible()
  }

  async checkNewLabelData() {
    await expect(this.nameInput).toHaveValue(constants.dataForCreate.labelName)
  }

  async createLabel() {
    await this.openNewLabelForm()
    await this.waitForLabelForm()
    await this.nameInput.fill(constants.dataForCreate.labelName)
    await this.saveLabelButton.click()
  }

  async checkLabelRows() {
    const rows = await this.page.getByRole('row')
    const rowsArray = Array.from(rows)
    rowsArray.forEach(async (row) => {
      await expect(row.locator('td')).toHaveCount(4);
      }
    )
  }

  async checkLabelCells() {
    const cells = await this.page.getByRole('cell')
    await expect(await cells.count()).toBeGreaterThan(0)
    const cellArray = Array.from(cells)
    cellArray.forEach(async (cell) => {
      await expect(cell).toBeVisible()
      expect(cell.textContent()).toBeDefined()
      expect(cell.textContent()?.trim()).not.toBe('')
    })
  }

  async checkLabelsList() {
    await this.checkLabelRows()
    await this.checkLabelCells()
    await expect(this.page.getByText(constants.dataForView.labelName, { exact: true })).toBeVisible()
  }

  async checkLabelDataBefore() {
    await expect(this.page.getByText(constants.labelToEdit, { exact: true })).toBeVisible()
  }

  async openLabelInfo(name) {
    const row = await this.page.getByRole('row').filter({ has: this.page.getByText(name) })
    await expect(row).toBeVisible()
    await row.click()
    await expect(this.page.getByText(`Label ${constants.labelToEdit}`)).toBeVisible()
  }

  async fillOutLabelFields(name) {
    await this.nameInput.fill(name)
  }

  async editLabel() {
    await this.openLabelInfo(constants.labelToEdit)
    await this.waitForLabelForm()
    await this.fillOutLabelFields(
      constants.newDataForEdit.labelName,
    )
    await this.saveLabelButton.click()
  }

  async checkEditedLabelData() {
    await expect(this.page.getByText(constants.newDataForEdit.labelName,  { exact: true })).toBeVisible()
  }

  async putOnCheckboxForLabel() {
    const row = await this.page.getByRole('row').filter({ has: this.page.getByText(constants.labelToDelete, { exact: true }) })
    const checkbox = row.getByRole('checkbox')
    await checkbox.click()
  }

  async checkAllCheckboxesAfterPut() {
    const checkboxes = await this.page.getByRole('checkbox')
    const checkboxArray = Array.from(checkboxes)
    checkboxArray.forEach(async (checkbox) => {
      await expect(checkbox).toBeChecked()
    })
  }
  
  async deleteLabel() {
    await this.deleteLabelButton.click()
  }

  async checkLabelAfterDelete() {
    const el = this.page.getByText(constants.labelToDelete, { exact: true })
    await expect(el).not.toBeVisible()
  }

  async putOnCheckboxForAllLabels() {
    await this.deleteAllCheckbox.click()
  }

  async checkLabelsAfterDelete() {
    const el = this.page.getByText(pageEl.emptyLabelsListMessage)
    await expect(el).toBeVisible()
  }
}