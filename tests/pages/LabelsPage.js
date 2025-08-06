import { expect } from '@playwright/test'
import * as constants from '../utils/constants.js'
import { Helpers }  from './Helpers.js'

const pageEl = constants.pagesEl.labelsPage

export default class LabelsPage extends Helpers {
  /**
   * @param {Page} page
   */
  constructor(page) {
    super(page)
    this.page = page
    this.nameInput = page.getByLabel(pageEl.nameInputLabel)
  }

  async waitForLabelForm() {
    await expect(this.saveButton).toBeVisible()
    await expect(this.page.getByText(pageEl.createLabelTitle)).toBeVisible()
    await expect(this.nameInput).toBeVisible()
    await expect(this.page.getByText(pageEl.createLabelTitle)).toBeVisible()
  }

  async checkNewLabelData() {
    await expect(this.nameInput).toHaveValue(constants.dataForCreate.labelName)
  }

  async fillOutLabelFields(name) {
    await this.nameInput.fill(name)
  }

  async createLabel() {
    await super.openCreateForm()
    await this.waitForLabelForm()
    await this.fillOutLabelFields(constants.dataForCreate.labelName)
    await super.save()
  }

  async checkLabelsList() {
    const expectedCount = 4
    await super.checkRows(expectedCount)
    await super.checkCells()
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

  async editLabel() {
    await this.openLabelInfo(constants.labelToEdit)
    await this.fillOutLabelFields(
      constants.newDataForEdit.labelName,
    )
    await super.save()
  }

  async checkEditedLabelData() {
    await expect(this.page.getByText(constants.newDataForEdit.labelName,  { exact: true })).toBeVisible()
  }

  async putOnCheckboxForLabel() {
    const row = await this.page.getByRole('row').filter({ has: this.page.getByText(constants.labelToDelete, { exact: true }) })
    const checkbox = row.getByRole('checkbox')
    await checkbox.click()
  }
  
  async checkLabelAfterDelete() {
    const el = this.page.getByText(constants.labelToDelete, { exact: true })
    await expect(el).not.toBeVisible()
  }

  async checkLabelsAfterDelete() {
    await this.checkMessageAboutEmptyList(pageEl.emptyLabelsListMessage)
    await this.checkRowsAfterDelete()
  }
}