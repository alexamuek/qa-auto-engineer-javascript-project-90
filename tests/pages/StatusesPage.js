import { expect } from '@playwright/test'
import { statusesPageElements } from '../utils/constants.js'
import { dataForCreate, dataForView, statusToEdit, newDataForEdit, statusToDelete } from '../../__fixtures__/data.js'
import { Helpers }  from './Helpers.js'

const pageEl = statusesPageElements

export default class StatusesPage extends Helpers {
  /**
   * @param {Page} page
   */
  constructor(page) {
    super(page)
    this.page = page
    this.nameInput = page.getByLabel(pageEl.nameInputLabel)
    this.slugInput = page.getByLabel(pageEl.slugInputLabel)
  }

  async waitForStatusForm() {
    await expect(this.saveButton).toBeVisible()
    await expect(this.nameInput).toBeVisible()
    await expect(this.slugInput).toBeVisible()
    await expect(this.page.getByText(pageEl.createStatusTitle)).toBeVisible()
  }

  async checkNewStatusData() {
    await expect(this.nameInput).toHaveValue(dataForCreate.statusName)
    await expect(this.slugInput).toHaveValue(dataForCreate.slug)
  }

  async fillOutStatusFields(name, slug) {
    await this.nameInput.fill(name)
    await this.slugInput.fill(slug)
  }

  async createStatus() {
    await super.openCreateForm()
    await this.waitForStatusForm()
    await this.fillOutStatusFields(
      dataForCreate.statusName,
      dataForCreate.slug
    )
    await super.save()
  }

  async checkStatusesList() {
    const expectedCount = 5
    await super.checkRows(expectedCount)
    await super.checkCells()
    await expect(this.page.getByText(dataForView.statusName, { exact: true })).toBeVisible()
    await expect(this.page.getByText(dataForView.slug, { exact: true })).toBeVisible()
  }

  async checkStatusDataBefore() {
    await expect(this.page.getByText(statusToEdit, { exact: true })).toBeVisible()
  }

  async openStatusInfo(name) {
    const row = await this.page.getByRole('row').filter({ has: this.page.getByText(name) })
    await expect(row).toBeVisible()
    await row.click()
    await expect(this.page.getByText(`Task status ${statusToEdit}`)).toBeVisible()
  }

  async editStatus() {
    await this.openStatusInfo(statusToEdit)
    await this.fillOutStatusFields(
      newDataForEdit.statusName,
      newDataForEdit.slug,

    )
    await super.save()
  }

  async checkEditedStatusData() {
    await expect(this.page.getByText(newDataForEdit.statusName,  { exact: true })).toBeVisible()
    await expect(this.page.getByText(newDataForEdit.slug,  { exact: true })).toBeVisible()
  }

  async putOnCheckboxForStatus() {
    const row = await this.page.getByRole('row').filter({ has: this.page.getByText(statusToDelete, { exact: true }) })
    const checkbox = row.getByRole('checkbox')
    await checkbox.click()
  }

  async checkStatusAfterDelete() {
    const el = this.page.getByText(statusToDelete, { exact: true })
    await expect(el).not.toBeVisible()
  }

  async checkStatusesAfterDelete() {
    await this.checkMessageAboutEmptyList(pageEl.emptyStatusesListMessage)
    await this.checkRowsAfterDelete()
  }
}