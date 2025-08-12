import { expect } from '@playwright/test'
import { tasksPageElements, commonElsElements } from '../utils/constants.js'
import { dataForCreate, statusesForTaskList, newDataForEdit, } from '../../__fixtures__/data.js'
import { Helpers }  from './Helpers.js'

const pageEl = tasksPageElements

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
    await expect(this.assigneeSelection).toContainText(dataForCreate.assigneeUser)
    await expect(this.titleInput).toHaveValue(dataForCreate.title)
    await expect(this.contentInput).toHaveValue(dataForCreate.content)
    await expect(this.statusSelection).toContainText(dataForCreate.statusForTask)
    await expect(this.labelSelection).toContainText(dataForCreate.labelForTask1)
    await expect(this.labelSelection).toContainText(dataForCreate.labelForTask2)
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
    await this.chooseItem(this.assigneeSelection, dataForCreate.assigneeUser)
    await this.titleInput.fill(dataForCreate.title)
    await this.contentInput.fill(dataForCreate.content)
    await this.chooseItem(this.statusSelection, dataForCreate.statusForTask)
    await this.chooseMultiItems(this.labelSelection, dataForCreate.labelForTask1, dataForCreate.labelForTask2)
    await super.save()
  }

  async checkTasksList() {
    const statuses = statusesForTaskList
    statuses.forEach(async (status) => {
      const header = this.page.getByText(status)
      await expect(header).toBeVisible()
    })
    const taskButtons = await this.page.getByRole('button').filter({ hasText: 'Index' }).all()
    taskButtons.forEach(async (task) => {
      const showLink = await task.locator(`[aria-label="${commonElsElements.showLabel}"]`)
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
    await editLink.click()
    await expect(this.page.getByText(pageEl.idLabel)).toBeVisible()
  }

  async fillOutTaskFields() {
    await this.titleInput.fill(newDataForEdit.title)
    await this.contentInput.fill(newDataForEdit.content)
  }

  async editTask() {
    await this.fillOutTaskFields()
    await super.save()
  }

  async checkEditedTaskData() {
    await expect(this.page.getByText(newDataForEdit.title,  { exact: true })).toBeVisible()
    await expect(this.page.getByText(newDataForEdit.content,  { exact: true })).toBeVisible()
  }

  async openViewOfTask() {
    const showLink = await this.showButton.first()
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
    const locator = this.page.locator(`[data-source="${obj}"]`)
    await locator.click()
    await this.page.waitForSelector('li')
    await this.page.locator('li').filter({ hasText: value }).evaluate(el => el.click())
    await expect(locator).toContainText(value)
  }

  async removeFilterByObj(obj) {
    const locator = this.page.locator(`[data-source="${obj}"]`)
    await locator.click()
    await this.page.locator('li[aria-label="Clear value"]').click()
    await expect(locator).toContainText('')
  }

  async getTaskCount() {
    const tasks = await this.page.locator('[data-rfd-drag-handle-draggable-id]').all()
    return tasks.length
  }

  async filterByAssignee() {
    await this.filterByObj('assignee_id' , dataForCreate.assigneeUser)
  }

  async filterByStatus() {
    await this.filterByObj('status_id' , dataForCreate.statusForTask)
  }

  async filterByLabel() {
    await this.filterByObj('label_id' , dataForCreate.labelForTask1)
  }

  async removeFilterByAssignee() {
    await this.removeFilterByObj('assignee_id')
  }

  async removeFilterByStatus() {
    await this.removeFilterByObj('status_id')
  }

  async removeFilterByLabel() {
    await this.removeFilterByObj('label_id')
  }

  async checkFilterResult(taskId, startCount) {
    const taskEditButton = this.page.locator(`[href="#/tasks/${taskId}"]`)
    await expect(taskEditButton).toBeVisible()
    await expect.poll(async () => {
      const items = await this.page.locator('[data-rfd-drag-handle-draggable-id]')
      return items.count()
    }).toBeLessThan(startCount)
  }

  async checkRemoveFilter(taskId, startCount) {
    const taskEditButton = this.page.locator(`[href="#/tasks/${taskId}"]`)
    await expect(taskEditButton).toBeVisible()
    const items = this.page.locator('[data-rfd-drag-handle-draggable-id]')
    await expect(items).toHaveCount(startCount, { timeout: 10000 })
  }

  async dragAndDrop(taskId) {
    const toReviewColumn = this.page.locator('[data-rfd-droppable-id="2"]')
    const card = this.page.locator(`[data-rfd-drag-handle-draggable-id="${taskId}"]`)
    const cardBox = await card.boundingBox()
    const targetBox = await toReviewColumn.boundingBox()
    const cardX = cardBox.x + cardBox.width / 2
    const cardY = cardBox.y + cardBox.height / 2
    await this.page.mouse.move(cardX, cardY)
    await this.page.mouse.down()
    const targetX = targetBox.x + targetBox.width / 2
    const targetY = targetBox.y + targetBox.height / 2
    await this.page.mouse.move(targetX, targetY, { steps: 10 })
    await this.page.waitForTimeout(500)
    await this.page.mouse.up()
  }

  async checkMoveResult(taskId) {
    await this.page.locator(`[href="#/tasks/${taskId}"]`).click()
    await expect(this.statusSelection).toContainText('To Review')
  }

}