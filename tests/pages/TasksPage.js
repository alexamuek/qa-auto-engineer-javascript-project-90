import { expect } from '@playwright/test'
import { tasksPageElements, commonElsElements } from '../utils/constants.js'
import { statusesForTaskList, newDataForEdit, } from '../../__fixtures__/data.js'
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

  async checkNewTaskData(data) {
    await expect(this.assigneeSelection).toContainText(data.assigneeUser)
    await expect(this.titleInput).toHaveValue(data.title)
    await expect(this.contentInput).toHaveValue(data.content)
    await expect(this.statusSelection).toContainText(data.statusForTask)
    await expect(this.labelSelection).toContainText(data.labelForTask)
  }

  async chooseItem(el, item) {
    await el.click()
    await this.page.getByText(item, { exact: true }).click()
  }

  async chooseMultiItems(el, item) {
    await el.click()
    await this.page.getByText(item, { exact: true }).click()
    await this.page.keyboard.press('Escape')
  }

  async createTask(data) {
    await this.chooseItem(this.assigneeSelection, data.assigneeUser)
    await this.titleInput.fill(data.title)
    await this.contentInput.fill(data.content)
    await this.chooseItem(this.statusSelection, data.statusForTask)
    await this.chooseMultiItems(this.labelSelection, data.labelForTask)
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

  async filterBySelector(selectorId, value) {
    const locator = this.page.locator(`[data-source="${selectorId}"]`)
    await locator.click()
    await this.page.waitForSelector('li')
    await this.page.locator('li').filter({ hasText: value }).evaluate(el => el.click())
    await expect(locator).toContainText(value)
  }

  async removeFilterForSelector(selectorId) {
    const locator = this.page.locator(`[data-source="${selectorId}"]`)
    await locator.click()
    await this.page.locator('li[aria-label="Clear value"]').click()
    await expect(locator).toContainText('')
  }

  async getTaskCount() {
    const tasks = await this.page.locator('[data-rfd-drag-handle-draggable-id]').all()
    return tasks.length
  }

  async filterByAssignee(assigneeUser) {
    await this.filterBySelector('assignee_id' , assigneeUser)
  }

  async filterByStatus(status) {
    await this.filterBySelector('status_id' ,status)
  }

  async filterByLabel(label) {
    await this.filterBySelector('label_id' , label)
  }

  async removeFilterForAssignee() {
    await this.removeFilterForSelector('assignee_id')
  }

  async removeFilterForStatus() {
    await this.removeFilterForSelector('status_id')
  }

  async removeFilterForLabel() {
    await this.removeFilterForSelector('label_id')
  }

  async isTaskVisible(taskId, startCount) {
    await expect.poll(async () => {
      const items = await this.page.locator('[data-rfd-drag-handle-draggable-id]')
      return items.count()
    }).toBeLessThan(startCount)
    try {
      const taskEditButton = this.page.locator(`[href="#/tasks/${taskId}"]`)
      await expect(taskEditButton).toBeVisible()
      return true
    } catch {
      return false
    }
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