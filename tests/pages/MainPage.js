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
  }

  async waitForControls() {
    await expect(this.themeButton).toBeVisible()
    await expect(this.profileButton).toBeVisible()
  }

  async openProfile() {
    await this.profileButton.click()
  }

  async logout() {
    await this.logoutButton.click()
    await expect(this.logoutButton).toBeHidden()
  }

  async checkLogoutControl() {
    await expect(this.logoutButton).toBeHidden()
  }
}