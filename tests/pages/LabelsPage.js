import { expect } from '@playwright/test'
import { labelsPageElements } from '../utils/constants.js'
import { dataForCreate, dataForView, labelToEdit, newDataForEdit, labelToDelete } from '../../__fixtures__/data.js'
import { Helpers }  from './Helpers.js'

const pageEl = labelsPageElements

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
    await expect(this.nameInput).toHaveValue(dataForCreate.labelName)
  }

  async fillOutLabelFields(name) {
    await this.nameInput.fill(name)
  }

  async createLabel() {
    await super.openCreateForm()
    await this.waitForLabelForm()
    await this.fillOutLabelFields(dataForCreate.labelName)
    await super.save()
  }

  async checkLabelsList() {
    const expectedCount = 4
    await super.checkRows(expectedCount)
    await super.checkCells()
    await expect(this.page.getByText(dataForView.labelName, { exact: true })).toBeVisible()
  }

  async checkLabelDataBefore() {
    await expect(this.page.getByText(labelToEdit, { exact: true })).toBeVisible()
  }

  async openLabelInfo(name) {
    const row = await this.page.getByRole('row').filter({ has: this.page.getByText(name) })
    await expect(row).toBeVisible()
    await row.click()
    await expect(this.page.getByText(`Label ${labelToEdit}`)).toBeVisible()
  }

  async editLabel() {
    await this.openLabelInfo(labelToEdit)
    await this.fillOutLabelFields(
      newDataForEdit.labelName,
    )
    await super.save()
  }

  async checkEditedLabelData() {
    await expect(this.page.getByText(newDataForEdit.labelName,  { exact: true })).toBeVisible()
  }

  async putOnCheckboxForLabel() {
    const row = await this.page.getByRole('row').filter({ has: this.page.getByText(labelToDelete, { exact: true }) })
    const checkbox = row.getByRole('checkbox')
    await checkbox.click()
  }
  
  async checkLabelAfterDelete() {
    const el = this.page.getByText(labelToDelete, { exact: true })
    await expect(el).not.toBeVisible()
  }

  async checkLabelsAfterDelete() {
    await this.checkMessageAboutEmptyList(pageEl.emptyLabelsListMessage)
    await this.checkRowsAfterDelete()
  }
}