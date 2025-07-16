import { expect } from '@playwright/test'
import * as constants from '../utils/constants.js'

export default class StartPage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page
    this.inputName = page.getByLabel(constants.usernameLabel)
    this.inputPassword = page.getByLabel(constants.passwordLabel)
    this.signInButton = page.getByRole('button', { name: constants.loginButtonLabel })
  }

  async goto() {
    await this.page.goto('http://localhost:5173/#/login')
  }

  async waitForStartForm() {
    await expect(this.inputName).toBeVisible()
    await expect(this.inputPassword).toBeVisible()
    await expect(this.signInButton).toBeVisible()
  }

  async login() {
    await this.inputName.fill(constants.username)
    await this.inputPassword.fill(constants.password)
    await this.signInButton.click()
  }
}