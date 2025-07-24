import { expect } from '@playwright/test'
import * as constants from '../utils/constants.js'

const pageEl = constants.pagesEl.startPage

export default class StartPage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page
    this.inputName = page.getByLabel(pageEl.usernameLabel)
    this.inputPassword = page.getByLabel(pageEl.passwordLabel)
    this.signInButton = page.getByRole('button', { name: pageEl.loginButtonLabel })
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