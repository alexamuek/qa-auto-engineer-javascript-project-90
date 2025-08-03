import { test, expect } from '@playwright/test'
import StartPage from './pages/StartPage.js'
import MainPage from './pages/MainPage.js'
import TasksPage from './pages/TasksPage.js'
import * as constants from './utils/constants.js'

let startPage
let mainPage
let tasksPage

test.beforeEach(async ({ page }) => {
  startPage = new StartPage(page)
  await startPage.goto()
  await startPage.login()
  mainPage = new MainPage(page)
  await mainPage.openTasksList()
  tasksPage = new TasksPage(page)
})

test.afterEach(async ({ page }) => {
  await page.close()
})

test.describe('Positive Tests', () => {
  test('open form for new task', async ({ page }) => {
    await tasksPage.openNewTaskForm()
    await tasksPage.waitForTaskForm()
  })

  test('create task', async ({ page }) => {
    await tasksPage.openNewTaskForm()
    await tasksPage.waitForTaskForm()
    await tasksPage.createTask()
    await tasksPage.checkResultForNewTask()
    await tasksPage.checkNewTaskData()
  })

  test('check tasks list', async ({ page }) => {
    await tasksPage.checkTasksList()
  })

  test('edit task', async ({ page }) => {
    await tasksPage.checkTaskDataBeforeAndOpen()
    await tasksPage.editTask()
    await tasksPage.checkEditedTaskData()
  })

  test('open view of task', async ({ page }) => {
    await tasksPage.openViewOfTask()
    await tasksPage.checkTaskInViewMode()
  })

  test('delete task', async ({ page }) => {
    await tasksPage.openNewTaskForm()
    await tasksPage.createTask()
    const taskId = await tasksPage.getNewTaskID()
    await tasksPage.goToTaskList()
    await tasksPage.deleteCreatedTask(taskId)
  })
})
