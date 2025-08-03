import { expect } from '@playwright/test'
import * as constants from '../utils/constants.js'

const pageEl = constants.pagesEl.tasksPage

export default class TasksPage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page
    this.createTaskLink = page.getByRole('link', { name: pageEl.createTaskLabel, exact: true })
    this.saveTaskButton = page.getByRole('button', { name: pageEl.taskSaveButtonLabel })
    this.editTaskButton = page.getByRole('link', { name: pageEl.editTaskButtonLabel })
    this.showTaskButton = page.getByRole('link', { name: pageEl.showTaskButtonLabel })
    this.assigneeSelection = page.getByRole('combobox', { name: pageEl.assigneeSelectionLabel }) // page.getByLabel(pageEl.assigneeSelectionLabel)
    this.titleInput = page.getByLabel(pageEl.titleInputLabel)
    this.contentInput = page.locator('textarea[name="content"]')
    this.statusSelection = page.getByLabel(pageEl.statusSelectionLabel)
    this.labelSelection = page.getByLabel(pageEl.labelSelectionLabel, { exact: true })
    this.deleteTaskButton = page.getByRole('button', { name: pageEl.deleteTaskButtonLabel })
    this.tasksMenuItem = page.getByRole('menuitem', { name: pageEl.tasksMenuItemLabel })
  }

  async openNewTaskForm() {
    await this.createTaskLink.click()
  }

  async waitForTaskForm() {
    await expect(this.saveTaskButton).toBeVisible()
    await expect(this.assigneeSelection).toBeVisible()
    await expect(this.titleInput).toBeVisible()
    await expect(this.contentInput).toBeVisible()
    await expect(this.statusSelection).toBeVisible()
    await expect(this.labelSelection).toBeVisible()
    await expect(this.page.getByText(pageEl.createTaskTitle)).toBeVisible()
  }

  async checkResultForNewTask() {
    const resultMessage = this.page.getByText(pageEl.createTaskResultMessage)
    await expect(resultMessage).toBeVisible()
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
    await this.saveTaskButton.click()
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

    const editButtons = await this.page.getByRole('link', { name: 'Edit' }).all()
    editButtons.forEach((button) => {
      expect(button).toBeVisible()
    })
    await expect(taskButtons.length).toEqual(editButtons.length)
  }

  async checkTaskDataBeforeAndOpen() {
    const editLink = await this.editTaskButton.first()
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
    await this.saveTaskButton.click()
  }

  async checkEditedTaskData() {
    await expect(this.page.getByText(constants.newDataForEdit.title,  { exact: true })).toBeVisible()
    await expect(this.page.getByText(constants.newDataForEdit.content,  { exact: true })).toBeVisible()
  }

  async openViewOfTask() {
    const showLink = await this.showTaskButton.first()
    expect(showLink).toBeVisible()
    await showLink.click()
  }

  async checkTaskInViewMode() {
    await expect(this.page.getByText(pageEl.idLabel)).toBeVisible()
    await expect(this.page.getByText(pageEl.createAtLabel)).toBeVisible()
    await expect(this.assigneeSelection).not.toBeVisible()
    await expect(this.deleteTaskButton).toBeVisible()
  }

  async goToTaskList() {
    await this.tasksMenuItem.click()
  }

  async deleteCreatedTask(taskId) {
    const taskEditButton = this.page.locator(`[href="#/tasks/${taskId}"]`)
    await expect(taskEditButton).toBeVisible()
    await taskEditButton.click()
    await this.deleteTaskButton.click()
    await expect(this.page.locator(`[href="#/tasks/${taskId}"]`)).not.toBeVisible()
  }
}