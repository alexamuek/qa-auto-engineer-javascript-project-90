export const username = 'Alex'
export const password = 'qwe123asd'
export const wrongEmailToPut1 = 'google.com'
export const wrongEmailToPut2 = '@google.com'
export const wrongEmailToPut3 = 'google@google'
export const dataForCreate = {
  email: 'alex@gmail.com',
  firstName: 'Alex1',
  lastName: 'Alex2',
  statusName: 'Testing',
  slug: 'to_test',
  labelName: 'low',
  assigneeUser: 'john@google.com',
  title: 'New bug',
  content: 'Big bug',
  statusForTask: 'Draft',
  labelForTask1: 'bug',
  labelForTask2: 'feature',
}
export const dataForView = {
  email: 'john@google.com',
  firstName: 'John',
  lastName: 'Doe', 
  statusName: 'Draft',
  slug: 'draft',
  labelName: 'bug',
}
export const statusesForTaskList = ['Draft', 'To Review', 'To Be Fixed', 'To Publish', 'Published' ]
export const userToEdit = 'john@google.com'
export const statusToEdit = 'Draft'
export const labelToEdit = 'bug'
export const taskToEdit = 'Task 11'
export const userToDelete = 'john@google.com'
export const statusToDelete = 'Draft'
export const labelToDelete = 'bug'
export const newDataForEdit = {
  email: 'google@google.com',
  firstName: 'Mike',
  lastName: 'Jonson',
  statusName: 'Draft1',
  slug: 'draft1',
  labelName: 'bug1',
  title: 'Updated Task',
  content: 'New content',
}
export const pagesEl = {
  startPage: {
    usernameLabel: 'username',
    passwordLabel: 'password',
    loginButtonLabel: 'sign in',
  },
  mainPage: {
    themeButtonLabel: 'Toggle light/dark mode',
    profileButtonLabel: 'Profile',
    logoutButtonLabel: 'Logout',
    welcomeText: 'Welcome to the administration',
    usersMenuItemLabel: 'users',
    statusMenuItemLabel: 'task statuses',
    labelMenuItemLabel: 'labels',
    tasksMenuItemLabel: 'Tasks',
  },
  usersPage: {
    createUserLabel: 'Create',
    userSaveButtonLabel: 'Save',
    emailInputLabel: 'email',
    firstNameInputLabel: 'First name',
    lastNameInputLabel: 'Last name',
    deleteUserButtonLabel: 'Delete',
    errorMessageForProfileSave: 'The form is not valid. Please check for errors',
    incorrectEmailMessage: 'Incorrect email format',
    emptyUserListMessage: 'No Users yet.',
    requiredMessageForProfileSave: 'Required',
    createUserResultMessage: 'Element created',
    deleteAllCheckboxLabel: 'Select all',
    createUserTitle: 'Create User',
  },
  statusesPage: {
    createStatusLabel: 'Create',
    statusSaveButtonLabel: 'Save',
    nameInputLabel: 'name',
    slugInputLabel: 'slug',
    createStatusResultMessage: 'Element created',
    deleteStatusButtonLabel: 'Delete',
    deleteAllCheckboxLabel: 'Select all',
    emptyStatusesListMessage: 'No Task statuses yet.',
    createStatusTitle: 'Create Task status',
  },
  labelsPage: {
    createLabel: 'Create',
    labelSaveButtonLabel: 'Save',
    nameInputLabel: 'name',
    createLabelResultMessage: 'Element created',
    deleteLabelButtonLabel: 'Delete',
    deleteAllCheckboxLabel: 'Select all',
    emptyLabelsListMessage: 'No Labels yet.',
    createLabelTitle: 'Create Label',
  },
  tasksPage: {
    createTaskLabel: 'Create',
    taskSaveButtonLabel: 'Save',
    assigneeSelectionLabel: 'assignee',
    titleInputLabel: 'Title',
    contentInputLabel: 'content',
    statusSelectionLabel: 'Status',
    labelSelectionLabel: 'Label',
    createTaskResultMessage: 'Element created',
    deleteTaskButtonLabel: 'Delete',
    editTaskButtonLabel: 'Edit',
    showTaskButtonLabel: 'Show',
    createTaskTitle: 'Create Task',
    createAtLabel: 'Created at',
    idLabel: 'Id',
    tasksMenuItemLabel: 'Tasks',
  },
}
