import { expect } from '@playwright/test'
import * as constants from '../utils/constants.js'
import { Helpers }  from './Helpers.js'

const pageEl = constants.pagesEl.statusesPage

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
    await expect(this.nameInput).toHaveValue(constants.dataForCreate.statusName)
    await expect(this.slugInput).toHaveValue(constants.dataForCreate.slug)
  }

  async fillOutStatusFields(name, slug) {
    await this.nameInput.fill(name)
    await this.slugInput.fill(slug)
  }

  async createStatus() {
    await super.openCreateForm()
    await this.waitForStatusForm()
    await this.fillOutStatusFields(
      constants.dataForCreate.statusName,
      constants.dataForCreate.slug
    )
    await super.save()
  }

  async checkStatusesList() {
    const expectedCount = 5
    await super.checkRows(expectedCount)
    await super.checkCells()
    await expect(this.page.getByText(constants.dataForView.statusName, { exact: true })).toBeVisible()
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

  async editStatus() {
    await this.openStatusInfo(constants.statusToEdit)
    await this.fillOutStatusFields(
      constants.newDataForEdit.statusName,
      constants.newDataForEdit.slug,

    )
    await super.save()
  }

  async checkEditedStatusData() {
    await expect(this.page.getByText(constants.newDataForEdit.statusName,  { exact: true })).toBeVisible()
    await expect(this.page.getByText(constants.newDataForEdit.slug,  { exact: true })).toBeVisible()
  }

  async putOnCheckboxForStatus() {
    const row = await this.page.getByRole('row').filter({ has: this.page.getByText(constants.statusToDelete, { exact: true }) })
    const checkbox = row.getByRole('checkbox')
    await checkbox.click()
  }

  async checkStatusAfterDelete() {
    const el = this.page.getByText(constants.statusToDelete, { exact: true })
    await expect(el).not.toBeVisible()
  }

  async checkStatusesAfterDelete() {
    await this.checkMessageAboutEmptyList(pageEl.emptyStatusesListMessage)
    await this.checkRowsAfterDelete()
  }
}