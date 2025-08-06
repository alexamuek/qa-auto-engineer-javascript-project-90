import { expect } from '@playwright/test'
import * as constants from '../utils/constants.js'
import { Helpers }  from './Helpers.js'

const pageEl = constants.pagesEl.usersPage

export default class UsersPage extends Helpers {
  /**
   * @param {Page} page
   */
  constructor(page) {
    super(page)
    this.page = page
    this.emailInput = page.getByLabel(pageEl.emailInputLabel)
    this.firstNameInput = page.getByLabel(pageEl.firstNameInputLabel)
    this.lastNameInput = page.getByLabel(pageEl.lastNameInputLabel)
  }

  async openUserProfile(email) {
    const row = await this.page.getByRole('row').filter({ has: this.page.getByText(email) })
    await expect(row).toBeVisible()
    await row.click()
    await expect(this.page.getByText(`User ${constants.userToEdit}`)).toBeVisible()
  }

  async waitForUserForm() {
    await expect(this.saveButton).toBeVisible()
    await expect(this.emailInput).toBeVisible()
    await expect(this.firstNameInput).toBeVisible()
    await expect(this.lastNameInput).toBeVisible()
    await expect(this.page.getByText(pageEl.createUserTitle)).toBeVisible()
  }

  async fillOutUserFields(email, firstName, lastName) {
    await this.emailInput.fill(email)
    await this.firstNameInput.fill(firstName)
    await this.lastNameInput.fill(lastName)
  }

  async createUser() {
    await super.openCreateForm()
    await this.waitForUserForm()
    await this.fillOutUserFields(
      constants.dataForCreate.email,
      constants.dataForCreate.firstName,
      constants.dataForCreate.lastName
    )
    await super.save()
  }

  async editUser() {
    await this.openUserProfile(constants.userToEdit)
    await this.fillOutUserFields(
      constants.newDataForEdit.email,
      constants.newDataForEdit.firstName,
      constants.newDataForEdit.lastName
    )
    await super.save()
  }

  async checkNewUserData() {
    await expect(this.emailInput).toHaveValue(constants.dataForCreate.email)
    await expect(this.firstNameInput).toHaveValue(constants.dataForCreate.firstName)
    await expect(this.lastNameInput).toHaveValue(constants.dataForCreate.lastName)
    await expect(this.page.getByText(`User ${constants.dataForCreate.email}`)).toBeVisible()
  }

  async checkUsersList() {
    const expectedCount = 6
    await super.checkRows(expectedCount)
    await super.checkCells()
    await expect(this.page.getByText(constants.dataForView.email, { exact: true })).toBeVisible()
    await expect(this.page.getByText(constants.dataForView.firstName, { exact: true })).toBeVisible()
    await expect(this.page.getByText(constants.dataForView.lastName, { exact: true })).toBeVisible()
  }

  async checkUserDataBefore() {
    await expect(this.page.getByText(constants.userToEdit, { exact: true })).toBeVisible()
  }

  async checkEditedUserData() {
    await expect(this.page.getByText(constants.newDataForEdit.email)).toBeVisible()
    await expect(this.page.getByText(constants.newDataForEdit.firstName)).toBeVisible()
    await expect(this.page.getByText(constants.newDataForEdit.lastName)).toBeVisible()
  }

  async expectErrorMessage() {
    await expect(this.page.getByText(pageEl.errorMessageForProfileSave)).toBeVisible()
  }

  async expectRequiredMessage() {
    const requiredMessages = await this.page.$$(`p:text("${pageEl.requiredMessageForProfileSave}")`)
    expect(requiredMessages).toHaveLength(3)
  }

  async expectEmailFormatMessage() {
    await expect(this.page.getByText(pageEl.incorrectEmailMessage)).toBeVisible()
  }

  async putOnCheckboxForUser() {
    const row = await this.page.getByRole('row').filter({ has: this.page.getByText(constants.userToDelete) })
    const checkbox = row.getByRole('checkbox')
    await checkbox.click()
  }

  async checkUserAfterDelete() {
    const el = this.page.getByText(constants.userToDelete)
    await expect(el).not.toBeVisible()
  }

  async checkUsersAfterDelete() {
    await this.checkMessageAboutEmptyList(pageEl.emptyUserListMessage)
    await this.checkRowsAfterDelete()
  }
}