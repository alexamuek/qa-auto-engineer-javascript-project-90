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
  await startPage.goto()
  await startPage.login()
  mainPage = new MainPage(page)
  await mainPage.openTasksList()
  tasksPage = new TasksPage(page)
  await tasksPage.openCreateForm()
  await tasksPage.createTask()
  taskId = await tasksPage.getNewTaskID()
  await tasksPage.goToTaskList()
  taskCount = await tasksPage.getTaskCount()
})

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('Positive Tests', () => {
  test('filter by assignee', async () => {
    test.setTimeout(10000);
    await tasksPage.filterByAssignee()
    await tasksPage.checkFilterResult(taskId, taskCount)
    await tasksPage.removeFilterByAssignee()
    await tasksPage.checkRemoveFilter(taskId, taskCount)
  })

  test('filter by status', async () => {
    test.setTimeout(10000);
    await tasksPage.filterByStatus()
    await tasksPage.checkFilterResult(taskId, taskCount)
    await tasksPage.removeFilterByStatus()
    await tasksPage.checkRemoveFilter(taskId, taskCount)
  })

  test('filter by label', async () => {
    test.setTimeout(10000);
    await tasksPage.filterByLabel()
    await tasksPage.checkFilterResult(taskId, taskCount)
    await tasksPage.removeFilterByLabel()
    await tasksPage.checkRemoveFilter(taskId, taskCount)
  })

  test('drag and drop', async () => {
    test.setTimeout(15000);
    await tasksPage.dragAndDrop(taskId)
    await tasksPage.checkMoveResult(taskId)
  })
})
