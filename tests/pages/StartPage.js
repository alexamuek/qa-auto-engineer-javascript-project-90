import { expect } from '@playwright/test'

export default class StartPage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page
    this.inputName = page.getByLabel('username')
    this.inputPassword = page.getByLabel('Password')
    this.signInButton = page.getByRole('button', { name: 'Sign in' })
  }

  async goto() {
    await this.page.goto('http://localhost:5173/')
  }

  async waitForStartForm() {
    await expect(this.inputName).toBeVisible()
    await expect(this.inputPassword).toBeVisible()
    await expect(this.signInButton).toBeVisible()
  }
}