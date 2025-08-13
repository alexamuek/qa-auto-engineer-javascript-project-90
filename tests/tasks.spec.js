import { expect, test } from '@playwright/test'
import StartPage from './pages/StartPage.js'
import MainPage from './pages/MainPage.js'
import TasksPage from './pages/TasksPage.js'
import { dataForCreate, dataForNonSelectedTask } from '../__fixtures__/data.js'

let startPage
let mainPage
let tasksPage
let taskId
let taskCount

test.beforeEach(async ({ page }) => {
  startPage = new StartPage(page)
  await startPage.gotoLoginPage()
  await startPage.login()
  mainPage = new MainPage(page)
  await mainPage.openTasksList()
  tasksPage = new TasksPage(page)
})

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('Positive Tests', () => {
  test('open form for new task', async () => {
    await tasksPage.openCreateForm()
    await tasksPage.waitForTaskForm()
  })

  test('create task', async () => {
    await tasksPage.openCreateForm()
    await tasksPage.createTask(dataForCreate)
    await tasksPage.checkMessageForNewObj()
    await tasksPage.checkResultForNewTask()
    await tasksPage.checkNewTaskData(dataForCreate)
  })

  test('check tasks list', async () => {
    await tasksPage.checkTasksList()
  })

  test('edit task', async () => {
    await tasksPage.checkTaskDataBeforeAndOpen()
    await tasksPage.editTask()
    await tasksPage.checkEditedTaskData()
  })

  test('open view of task', async () => {
    await tasksPage.openViewOfTask()
    await tasksPage.checkTaskInViewMode()
  })

  test('delete task', async () => {
    await tasksPage.openCreateForm()
    await tasksPage.createTask(dataForCreate)
    const taskId = await tasksPage.getNewTaskID()
    await tasksPage.goToTaskList()
    await tasksPage.deleteCreatedTask(taskId)
  })
})

test.describe('Positive Tests for Filters, Drag and Drops', () => {
  test.beforeEach(async () => {
    await tasksPage.openCreateForm()
    await tasksPage.createTask(dataForCreate)
    taskId = await tasksPage.getNewTaskID()
    await tasksPage.goToTaskList()
    taskCount = await tasksPage.getTaskCount()
  })
  test('filter by assignee', async () => {
    test.setTimeout(15000);
    await tasksPage.filterByAssignee(dataForCreate.assigneeUser)
    const result = await tasksPage.isTaskVisible(taskId, taskCount)
    await expect(result).toBe(true)
    await tasksPage.removeFilterForAssignee()
    await tasksPage.checkRemoveFilter(taskId, taskCount)
  })

  test('filter by status', async () => {
    test.setTimeout(15000);
    await tasksPage.filterByStatus(dataForCreate.statusForTask)
    const result = await tasksPage.isTaskVisible(taskId, taskCount)
    await expect(result).toBe(true)
    await tasksPage.removeFilterForStatus()
    await tasksPage.checkRemoveFilter(taskId, taskCount)
  })

  test('filter by label', async () => {
    test.setTimeout(15000);
    await tasksPage.filterByLabel(dataForCreate.labelForTask)
    const result = await tasksPage.isTaskVisible(taskId, taskCount)
    await expect(result).toBe(true)
    await tasksPage.removeFilterForLabel()
    await tasksPage.checkRemoveFilter(taskId, taskCount)
  })

  test('drag and drop', async () => {
    test.setTimeout(15000);
    await tasksPage.dragAndDrop(taskId)
    await tasksPage.checkMoveResult(taskId)
  })
})

test.describe('Negative Tests for Filters - task is not in filter result', () => {
  test.beforeEach(async () => {
    await tasksPage.openCreateForm()
    await tasksPage.createTask(dataForNonSelectedTask)
    taskId = await tasksPage.getNewTaskID()
    await tasksPage.goToTaskList()
    taskCount = await tasksPage.getTaskCount()
  })
  test('filter by assignee', async () => {
    test.setTimeout(15000);
    await tasksPage.filterByAssignee(dataForCreate.assigneeUser)
    const result = await tasksPage.isTaskVisible(taskId, taskCount)
    await expect(result).toBe(false)
  })

  test('filter by status', async () => {
    test.setTimeout(15000);
    await tasksPage.filterByStatus(dataForCreate.statusForTask)
    const result = await tasksPage.isTaskVisible(taskId, taskCount)
    await expect(result).toBe(false)
  })

  test('filter by label', async () => {
    test.setTimeout(15000);
    await tasksPage.filterByLabel(dataForCreate.labelForTask)
    const result = await tasksPage.isTaskVisible(taskId, taskCount)
    await expect(result).toBe(false)
  })
})
