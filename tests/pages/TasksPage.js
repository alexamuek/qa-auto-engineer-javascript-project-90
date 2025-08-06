import { expect } from '@playwright/test'
import * as constants from '../utils/constants.js'
import { Helpers }  from './Helpers.js'

const pageEl = constants.pagesEl.tasksPage

export default class TasksPage extends Helpers {
  /**
   * @param {Page} page
   */
  constructor(page) {
    super(page)
    this.page = page
    this.assigneeSelection = page.getByRole('combobox', { name: pageEl.assigneeSelectionLabel }) // page.getByLabel(pageEl.assigneeSelectionLabel)
    this.titleInput = page.getByLabel(pageEl.titleInputLabel)
    this.contentInput = page.locator('textarea[name="content"]')
    this.statusSelection = page.getByLabel(pageEl.statusSelectionLabel)
    this.labelSelection = page.getByLabel(pageEl.labelSelectionLabel, { exact: true })
    this.tasksMenuItem = page.getByRole('menuitem', { name: pageEl.tasksMenuItemLabel })
  }

  async waitForTaskForm() {
    await expect(this.saveButton).toBeVisible()
    await expect(this.assigneeSelection).toBeVisible()
    await expect(this.titleInput).toBeVisible()
    await expect(this.contentInput).toBeVisible()
    await expect(this.statusSelection).toBeVisible()
    await expect(this.labelSelection).toBeVisible()
    await expect(this.page.getByText(pageEl.createTaskTitle)).toBeVisible()
  }

  async checkResultForNewTask() {
    await expect(this.page.getByText(pageEl.createAtLabel)).toBeVisible()
    const idEl = this.page.getByText(pageEl.idLabel)
    await expect(idEl).toBeVisible()
    // check id value
    const parent1 = idEl.locator('..')
    const parent2 = parent1.locator('..')
    const childEl = parent2.locator('> *').nth(1)
    await expect(childEl).toBeVisible()
    expect(childEl.textContent()).toBeDefined()
    expect(childEl.textContent()).not.toBe('')
  }

  async getNewTaskID() {
    const idEl = this.page.getByText(pageEl.idLabel)
    const parent1 = idEl.locator('..')
    const parent2 = parent1.locator('..')
    const childEl = parent2.locator('> *').nth(1)
    return await childEl.textContent()
  }

  async checkNewTaskData() {
    await expect(this.assigneeSelection).toContainText(constants.dataForCreate.assigneeUser)
    await expect(this.titleInput).toHaveValue(constants.dataForCreate.title)
    await expect(this.contentInput).toHaveValue(constants.dataForCreate.content)
    await expect(this.statusSelection).toContainText(constants.dataForCreate.statusForTask)
    await expect(this.labelSelection).toContainText(constants.dataForCreate.labelForTask1)
    await expect(this.labelSelection).toContainText(constants.dataForCreate.labelForTask2)
  }

  async chooseItem(el, item) {
    await el.click()
    await this.page.getByText(item, { exact: true }).click()
  }

  async chooseMultiItems(el, item1, item2) {
    await el.click()
    await this.page.getByText(item1, { exact: true }).click()
    await this.page.getByText(item2, { exact: true }).click()
    await this.page.keyboard.press('Escape')
  }

  async createTask() {
    await this.chooseItem(this.assigneeSelection, constants.dataForCreate.assigneeUser)
    await this.titleInput.fill(constants.dataForCreate.title)
    await this.contentInput.fill(constants.dataForCreate.content)
    await this.chooseItem(this.statusSelection, constants.dataForCreate.statusForTask)
    await this.chooseMultiItems(this.labelSelection, constants.dataForCreate.labelForTask1, constants.dataForCreate.labelForTask2)
    await super.save()
  }

  async checkTasksList() {
    const statuses = constants.statusesForTaskList
    statuses.forEach(async (status) => {
      const header = this.page.getByText(status)
      await expect(header).toBeVisible()
    })

    const taskButtons = await this.page.getByRole('button').filter({ hasText: 'Index' }).all()
    taskButtons.forEach(async (task) => {
      const showLink = await task.locator('[aria-label="Show"]')
      await expect(showLink).toBeVisible()
    })

    const editButtons = await this.editButton.all()
    editButtons.forEach((button) => {
      expect(button).toBeVisible()
    })
    await expect(taskButtons.length).toEqual(editButtons.length)
  }

  async checkTaskDataBeforeAndOpen() {
    const editLink = await this.editButton.first()
    expect(editLink).toBeVisible()
    await editLink.click()
    await expect(this.page.getByText(pageEl.idLabel)).toBeVisible()
  }

  async fillOutTaskFields(name) {
    await this.titleInput.fill(constants.newDataForEdit.title)
    await this.contentInput.fill(constants.newDataForEdit.content)
  }

  async editTask() {
    await this.fillOutTaskFields()
    await super.save()
  }

  async checkEditedTaskData() {
    await expect(this.page.getByText(constants.newDataForEdit.title,  { exact: true })).toBeVisible()
    await expect(this.page.getByText(constants.newDataForEdit.content,  { exact: true })).toBeVisible()
  }

  async openViewOfTask() {
    const showLink = await this.showButton.first()
    expect(showLink).toBeVisible()
    await showLink.click()
  }

  async checkTaskInViewMode() {
    await expect(this.page.getByText(pageEl.idLabel)).toBeVisible()
    await expect(this.page.getByText(pageEl.createAtLabel)).toBeVisible()
    await expect(this.assigneeSelection).not.toBeVisible()
    await expect(this.deleteButton).toBeVisible()
  }

  async goToTaskList() {
    await this.tasksMenuItem.click()
  }

  async deleteCreatedTask(taskId) {
    const taskEditButton = this.page.locator(`[href="#/tasks/${taskId}"]`)
    await expect(taskEditButton).toBeVisible()
    await taskEditButton.click()
    await super.delete()
    await expect(this.page.locator(`[href="#/tasks/${taskId}"]`)).not.toBeVisible()
  }

  async filterByObj(obj, value) {
    /*const locator = this.page.locator(`[data-source="${obj}"]`)
    await locator.click();
    await this.page.waitForSelector(`text="${value}"`)
    await this.page.click(`text="${value}"`);  
    await expect(locator).toContainText(value)*/

    const locator = this.page.getByRole('combobox').first()
    await locator.click()
    await this.page.waitForSelector(`text="${value}"`)
    await this.page.getByRole('option', { name: value, exact: true }).click({ force: true });
    
    await this.page.getByText('Users').toBeVisible()
    /*await locator1.locator('input').evaluate(el => {
      el.dispatchEvent(new Event('change', { bubbles: true }));
    });*/
    // await expect(locator).toContainText(value)
    // await this.page.locator('li[data-value="1"]').evaluate(el => el.click())
    // await expect(locator).toContainText(value)
    /*selectOption
    await this.page.waitForSelector(`text="${value}"`);
    await this.page.click(`text="${value}"`);
    await this.page.getByText('EDIT').toBeVisible()*/
  }

  async removeFilterByObj(obj) {
    const taskCountBefore = await this.getTaskCount()
    console.log(taskCountBefore)
    const locator = this.page.getByRole('combobox').first()
    await locator.click()
    await this.page.locator('li[aria-label="Clear value"]').evaluate(el => el.click())
    const taskCountAfter = await this.getTaskCount()
    console.log(taskCountAfter)
  }

  async getTaskCount() {
    const editButtons = await this.editTaskButton.all()
    return editButtons.length
  }

  async filterByAssignee() {
    
    await this.filterByObj('assignee_id' , constants.dataForCreate.assigneeUser)
    
  }

  async removeFilterByAssignee() {
    await this.removeFilterByObj('assignee_id')
  }

}