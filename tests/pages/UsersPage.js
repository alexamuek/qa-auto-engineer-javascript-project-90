import { expect } from '@playwright/test'
import * as constants from '../utils/constants.js'

const pageEl = constants.pagesEl.usersPage

export default class UsersPage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page
    this.createUserLink = page.getByRole('link', { name: pageEl.createUserLabel, exact: true })
    this.saveUserButton = page.getByRole('button', { name: pageEl.userSaveButtonLabel })
    this.emailInput = page.getByLabel(pageEl.emailInputLabel)
    this.firstNameInput = page.getByLabel(pageEl.firstNameInputLabel)
    this.lastNameInput = page.getByLabel(pageEl.lastNameInputLabel)
    this.deleteUserButton = page.getByRole('button', { name: pageEl.deleteUserButtonLabel })
    this.deleteAllCheckbox = page.getByRole('checkbox', { name: pageEl.deleteAllCheckboxLabel })
  }

  async openNewUserForm() {
    await this.createUserLink.click()
  }

  async openUserProfile(email) {
    const row = await this.page.getByRole('row').filter({ has: this.page.getByText(email) })
    await expect(row).toBeVisible()
    await row.click()
    await expect(this.page.getByText(`User ${constants.userToEdit}`)).toBeVisible()
  }

  async waitForUserForm() {
    await expect(this.saveUserButton).toBeVisible()
    await expect(this.emailInput).toBeVisible()
    await expect(this.firstNameInput).toBeVisible()
    await expect(this.lastNameInput).toBeVisible()
    //await expect(this.page.getByText(pageEl.createUserTitle)).toBeVisible()
  }

  async createUser() {
    await this.openNewUserForm()
    await this.waitForUserForm()
    await this.emailInput.fill(constants.dataForCreate.email)
    await this.firstNameInput.fill(constants.dataForCreate.firstName)
    await this.lastNameInput.fill(constants.dataForCreate.lastName)
    await this.saveUserButton.click()
  }

  async fillOutUserFields(email, firstName, lastName) {
    await this.emailInput.fill(email)
    await this.firstNameInput.fill(firstName)
    await this.lastNameInput.fill(lastName)
  }

  async saveUserProfile () {
    await this.saveUserButton.click()  
  }

  async editUserProfile() {
    await this.openUserProfile(constants.userToEdit)
    await this.fillOutUserFields(
      constants.newDataForEdit.email,
      constants.newDataForEdit.firstName,
      constants.newDataForEdit.lastName
    )
    await this.saveUserProfile()
  }

  async checkResultForNewUser() {
    const resultMessage = this.page.getByText(pageEl.createUserResultMessage)
    await expect(resultMessage).toBeVisible()
  }

  async checkNewUserData() {
    await expect(this.emailInput).toHaveValue(constants.dataForCreate.email)
    await expect(this.firstNameInput).toHaveValue(constants.dataForCreate.firstName)
    await expect(this.lastNameInput).toHaveValue(constants.dataForCreate.lastName)
    await expect(this.page.getByText(`User ${constants.dataForCreate.email}`)).toBeVisible()
  }

  async checkUsersRows() {
    const rows = await this.page.getByRole('row')
    const rowsArray = Array.from(rows)
    rowsArray.forEach(async (row) => {
      await expect(row.locator('td')).toHaveCount(6);
      }
    )
  }

  async checkUserCells() {
    const cells = await this.page.getByRole('cell')
    await expect(await cells.count()).toBeGreaterThan(0)
    const cellArray = Array.from(cells)
    cellArray.forEach(async (cell) => {
      await expect(cell).toBeVisible()
      expect(cell.textContent()).toBeDefined()
      expect(cell.textContent()?.trim()).not.toBe('')
    })
  }

  async checkUsersList() {
    await this.checkUsersRows()
    await this.checkUserCells()
    await expect(this.page.getByText(constants.dataForView.email, { exact: true })).toBeVisible()
    await expect(this.page.getByText(constants.dataForView.firstName, { exact: true })).toBeVisible()
    await expect(this.page.getByText(constants.dataForView.lastName, { exact: true })).toBeVisible()
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

  async putOnCheckboxForAllUsers() {
    await this.deleteAllCheckbox.click()
  }

  async checkAllCheckboxesAfterPut() {
    const checkboxes = await this.page.getByRole('checkbox')
    const checkboxArray = Array.from(checkboxes)
    checkboxArray.forEach(async (checkbox) => {
      await expect(checkbox).toBeChecked()
    })
  }

  async deleteUser() {
    await this.deleteUserButton.click()
  }

  async checkUserAfterDelete() {
    const el = this.page.getByText(constants.userToDelete)
    await expect(el).not.toBeVisible()
  }

  async checkUsersAfterDelete() {
    const el = this.page.getByText(pageEl.emptyUserListMessage)
    await expect(el).toBeVisible()
  }
}