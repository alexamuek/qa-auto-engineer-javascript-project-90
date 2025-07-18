import { expect } from '@playwright/test'
import * as constants from '../utils/constants.js'

export default class UsersPage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page
    this.createUserLink = page.getByRole('link', { name: constants.createUserLabel, exact: true })
    this.saveUserButton = page.getByRole('button', { name: constants.userSaveButtonLabel })
    this.emailInput = page.getByLabel(constants.emailInputLabel)
    this.firstNameInput = page.getByLabel(constants.firstNameInputLabel)
    this.lastNameInput = page.getByLabel(constants.lastNameInputLabel)
    this.deleteUserButton = page.getByRole('button', { name: constants.userSaveButtonLabel })
  }

  async openNewUserForm() {
    await this.createUserLink.click()
  }

  async openUserProfile() {
    const row = await this.page.getByRole('row').filter({ has: this.page.getByText(constants.userToEdit) })
    await expect(row).toBeVisible()
    await row.click()
    await expect(this.page.getByText(`User ${constants.userToEdit}`)).toBeVisible()
  }

  async waitForNewUserForm() {
    await expect(this.saveUserButton).toBeVisible()
    await expect(this.emailInput).toBeVisible()
    await expect(this.firstNameInput).toBeVisible()
    await expect(this.lastNameInput).toBeVisible()
  }

  async createUser() {
    await this.openNewUserForm()
    await this.waitForNewUserForm()
    await this.emailInput.fill(constants.dataForCreate.email)
    await this.firstNameInput.fill(constants.dataForCreate.firstName)
    await this.lastNameInput.fill(constants.dataForCreate.lastName)
    await this.saveUserButton.click()
  }

  async editUserProfile() {
    await this.openUserProfile()
    await this.emailInput.fill(constants.newDataForEdit.email)
    await this.firstNameInput.fill(constants.newDataForEdit.firstName)
    await this.lastNameInput.fill(constants.newDataForEdit.lastName)
    await this.saveUserButton.click()
  }

  async checkResultForNewUser() {
    const resultMessage = this.page.getByText(constants.createUserResultMessage)
    await expect(resultMessage).toBeVisible()
  }

  async checkNewUserData() {
    await expect(this.emailInput).toHaveValue(constants.dataForCreate.email)
    await expect(this.firstNameInput).toHaveValue(constants.dataForCreate.firstName)
    await expect(this.lastNameInput).toHaveValue(constants.dataForCreate.lastName)
    await expect(this.page.getByText(`User ${constants.dataForCreate.email}`)).toBeVisible()
  }

  async checkUsersList() {
    const cells = await this.page.getByRole('cell')
    await expect(await cells.count()).toBeGreaterThan(0)
    const cellArray = Array.from(cells)
    cellArray.forEach(async (cell) => {
      await expect(cell).toBeVisible()
      expect(cell.textContent()).toBeDefined()
      expect(cell.textContent()?.trim()).not.toBe('')
    })
  }

  async checkEditedUserData() {
    await expect(this.page.getByText(constants.newDataForEdit.email)).toBeVisible()
    await expect(this.page.getByText(constants.newDataForEdit.firstName)).toBeVisible()
    await expect(this.page.getByText(constants.newDataForEdit.lastName)).toBeVisible()
  }
}