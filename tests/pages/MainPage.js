import { expect } from '@playwright/test'
import * as constants from '../utils/constants.js'

const pageEl = constants.pagesEl.mainPage

export default class MainPage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page
    this.themeButton = page.getByRole('button', { name: pageEl.themeButtonLabel })
    this.profileButton = page.getByRole('button', { name: pageEl.profileButtonLabel })
    this.logoutButton = page.getByRole('menuitem', { name: pageEl.logoutButtonLabel })
    this.welcomeText = page.getByText(pageEl.welcomeText)
    this.usersMenuItem = page.getByRole('menuitem', { name: pageEl.usersMenuItemLabel })
    this.statusMenuItem = page.getByRole('menuitem', { name: pageEl.statusMenuItemLabel })
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

  async openStatusesList() {
    await this.statusMenuItem.click()
  }
}