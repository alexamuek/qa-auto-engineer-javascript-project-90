import { expect } from '@playwright/test'
import * as constants from '../utils/constants.js'

export default class MainPage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page
    this.themeButton = page.getByRole('button', { name: constants.themeButtonLabel })
    this.profileButton = page.getByRole('button', { name: constants.profileButtonLabel })
    this.logoutButton = page.getByRole('menuitem', { name: constants.logoutButtonLabel })
    this.welcomeText = page.getByText(constants.welcomeText)
    this.usersMenuItem = page.getByRole('menuitem', { name: constants.usersMenuItemLabel })
  }

  async waitForControls() {
    await expect(this.themeButton).toBeVisible()
    await expect(this.profileButton).toBeVisible()
    await expect(this.welcomeText).toBeVisible()
  }

  async openCurrentUserProfile() {
    await this.profileButton.click()
  }

  async logout() {
    await this.logoutButton.click()
  }

  async checkLogoutControl() {
    await expect(this.logoutButton).toBeHidden()
  }

  async openUsersList() {
    await this.usersMenuItem.click()
  }
}