import { expect } from '@playwright/test'
import * as constants from '../utils/constants.js'

const pageEl = constants.pagesEl.statusesPage

export default class StatusesPage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page
    this.createStatusLink = page.getByRole('link', { name: pageEl.createStatusLabel, exact: true })
    this.saveStatusButton = page.getByRole('button', { name: pageEl.statusSaveButtonLabel })
    this.nameInput = page.getByLabel(pageEl.nameInputLabel)
    this.slugInput = page.getByLabel(pageEl.slugInputLabel)
    this.deleteStatusButton = page.getByRole('button', { name: pageEl.deleteStatusButtonLabel })
    this.deleteAllCheckbox = page.getByRole('checkbox', { name: pageEl.deleteAllCheckboxLabel })
  }

  async openNewStatusForm() {
    await this.createStatusLink.click()
  }

  async waitForStatusForm() {
    await expect(this.saveStatusButton).toBeVisible()
    await expect(this.nameInput).toBeVisible()
    await expect(this.slugInput).toBeVisible()
  }

  async checkResultForNewStatus() {
    const resultMessage = this.page.getByText(pageEl.createStatusResultMessage)
    await expect(resultMessage).toBeVisible()
  }

  async checkNewStatusData() {
    await expect(this.nameInput).toHaveValue(constants.dataForCreate.name)
    await expect(this.slugInput).toHaveValue(constants.dataForCreate.slug)
  }

  async createStatus() {
    await this.openNewStatusForm()
    await this.waitForStatusForm()
    await this.nameInput.fill(constants.dataForCreate.name)
    await this.slugInput.fill(constants.dataForCreate.slug)
    await this.saveStatusButton.click()
  }

  async checkStatusRows() {
    const rows = await this.page.getByRole('row')
    const rowsArray = Array.from(rows)
    rowsArray.forEach(async (row) => {
      await expect(row.locator('td')).toHaveCount(5);
      }
    )
  }

  async checkStatusCells() {
    const cells = await this.page.getByRole('cell')
    await expect(await cells.count()).toBeGreaterThan(0)
    const cellArray = Array.from(cells)
    cellArray.forEach(async (cell) => {
      await expect(cell).toBeVisible()
      expect(cell.textContent()).toBeDefined()
      expect(cell.textContent()?.trim()).not.toBe('')
    })
  }

  async checkStatusesList() {
    await this.checkStatusRows()
    await this.checkStatusCells()
    await expect(this.page.getByText(constants.dataForView.name, { exact: true })).toBeVisible()
    await expect(this.page.getByText(constants.dataForView.slug, { exact: true })).toBeVisible()
  }

  async checkStatusDataBefore() {
    await expect(this.page.getByText(constants.statusToEdit, { exact: true })).toBeVisible()
  }

  async openStatusInfo(name) {
    const row = await this.page.getByRole('row').filter({ has: this.page.getByText(name) })
    await expect(row).toBeVisible()
    await row.click()
    await expect(this.page.getByText(`Task status ${constants.statusToEdit}`)).toBeVisible()
  }

  async fillOutStatusFields(name, slug) {
    await this.nameInput.fill(name)
    await this.slugInput.fill(slug)
  }

  async editStatus() {
    await this.openStatusInfo(constants.statusToEdit)
    await this.waitForStatusForm()
    await this.fillOutStatusFields(
      constants.newDataForEdit.name,
      constants.newDataForEdit.slug,

    )
    await this.saveStatusButton.click()
  }

  async checkEditedStatusData() {
    await expect(this.page.getByText(constants.newDataForEdit.name,  { exact: true })).toBeVisible()
    await expect(this.page.getByText(constants.newDataForEdit.slug,  { exact: true })).toBeVisible()
  }

  async putOnCheckboxForStatus() {
    const row = await this.page.getByRole('row').filter({ has: this.page.getByText(constants.statusToDelete, { exact: true }) })
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
  
  async deleteStatus() {
    await this.deleteStatusButton.click()
  }

  async checkStatusAfterDelete() {
    const el = this.page.getByText(constants.statusToDelete, { exact: true })
    await expect(el).not.toBeVisible()
  }

  async putOnCheckboxForAllStatuses() {
    await this.deleteAllCheckbox.click()
  }

  async checkStatusesAfterDelete() {
    const el = this.page.getByText(pageEl.emptyStatusesListMessage)
    await expect(el).toBeVisible()
  }
}