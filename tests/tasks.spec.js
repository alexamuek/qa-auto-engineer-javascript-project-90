import { test } from '@playwright/test'
import StartPage from './pages/StartPage.js'
import MainPage from './pages/MainPage.js'
import TasksPage from './pages/TasksPage.js'

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
    await tasksPage.createTask()
    await tasksPage.checkMessageForNewObj()
    await tasksPage.checkResultForNewTask()
    await tasksPage.checkNewTaskData()
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
    await tasksPage.createTask()
    const taskId = await tasksPage.getNewTaskID()
    await tasksPage.goToTaskList()
    await tasksPage.deleteCreatedTask(taskId)
  })
})

test.describe('Positive Tests for Filters, Drag and Drops', () => {
  test.beforeEach(async () => {
    await tasksPage.openCreateForm()
    await tasksPage.createTask()
    taskId = await tasksPage.getNewTaskID()
    await tasksPage.goToTaskList()
    taskCount = await tasksPage.getTaskCount()
  })
  test('filter by assignee', async () => {
    test.setTimeout(15000);
    await tasksPage.filterByAssignee()
    await tasksPage.checkFilterResult(taskId, taskCount)
    await tasksPage.removeFilterForAssignee()
    await tasksPage.checkRemoveFilter(taskId, taskCount)
  })

  test('filter by status', async () => {
    test.setTimeout(15000);
    await tasksPage.filterByStatus()
    await tasksPage.checkFilterResult(taskId, taskCount)
    await tasksPage.removeFilterForStatus()
    await tasksPage.checkRemoveFilter(taskId, taskCount)
  })

  test('filter by label', async () => {
    test.setTimeout(15000);
    await tasksPage.filterByLabel()
    await tasksPage.checkFilterResult(taskId, taskCount)
    await tasksPage.removeFilterForLabel()
    await tasksPage.checkRemoveFilter(taskId, taskCount)
  })

  test('drag and drop', async () => {
    test.setTimeout(15000);
    await tasksPage.dragAndDrop(taskId)
    await tasksPage.checkMoveResult(taskId)
  })
})
