import { expect } from '@playwright/test'
import * as constants from '../utils/constants.js'

const pageEl = constants.pagesEl.commonEls

class Helpers {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page
    this.createButton = page.getByRole('link', { name: pageEl.createLabel, exact: true })
    this.saveButton = page.getByRole('button', { name: pageEl.saveLabel })
    this.editButton = page.getByRole('link', { name: pageEl.editLabel })
    this.showButton = page.getByRole('link', { name: pageEl.showLabel })
    this.deleteButton = page.getByRole('button', { name: pageEl.deleteLabel })
    this.messageForCreate = this.page.getByText(pageEl.saveMessage)
    this.messageForUpdate = this.page.getByText(pageEl.updateMessage)
    this.messageForDelete = this.page.getByText(pageEl.deleteMessage)
    this.deleteAllCheckbox = page.getByRole('checkbox', { name: pageEl.deleteAllCheckboxLabel })
  }

  async openCreateForm() {
    await this.createButton.click()
  }

  async save() {
    await this.saveButton.click()
  }

  async delete() {
    await this.deleteButton.click()
  }

  async putOnCheckboxForAllItems() {
    await this.deleteAllCheckbox.click()
  }

  async deleteAllItems() {
    await this.putOnCheckboxForAllItems()
    await this.checkAllCheckboxesAfterPut()
    await this.delete()
  }

  async checkMessageForNewObj() {
    await expect(this.messageForCreate).toBeVisible()
  }

  async checkMessageForUpdatedObj() {
    await expect(this.messageForUpdate).toBeVisible()
  }

  async checkMessageForDeletedObj() {
    await expect(this.messageForDelete).toBeVisible()
  }

  async checkRowsAfterDelete() {
    const row = this.page.getByRole('row')
    await expect(row).not.toBeVisible()
  }

  async checkMessageAboutEmptyList(expectedMessage) {
    await expect(this.page.getByText(expectedMessage)).toBeVisible()
  }

  async checkRows(expectedCount) {
    const rows = await this.page.getByRole('row')
    const rowsArray = Array.from(rows)
    rowsArray.forEach(async (row) => {
      await expect(row.locator('td')).toHaveCount(expectedCount);
      }
    )
  }

  async checkCells() {
    const cells = await this.page.getByRole('cell')
    await expect(await cells.count()).toBeGreaterThan(0)
    const cellArray = Array.from(cells)
    cellArray.forEach(async (cell) => {
      await expect(cell).toBeVisible()
      expect(cell.textContent()).toBeDefined()
      expect(cell.textContent()?.trim()).not.toBe('')
    })
  }

  async checkAllCheckboxesAfterPut() {
    const checkboxes = await this.page.getByRole('checkbox')
    const checkboxArray = Array.from(checkboxes)
    checkboxArray.forEach(async (checkbox) => {
      await expect(checkbox).toBeChecked()
    })
  }
}

export { Helpers }
