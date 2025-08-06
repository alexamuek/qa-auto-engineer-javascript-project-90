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
    emailInputLabel: 'email',
    firstNameInputLabel: 'First name',
    lastNameInputLabel: 'Last name',
    errorMessageForProfileSave: 'The form is not valid. Please check for errors',
    incorrectEmailMessage: 'Incorrect email format',
    emptyUserListMessage: 'No Users yet.',
    requiredMessageForProfileSave: 'Required',
    createUserTitle: 'Create User',
  },
  statusesPage: {
    nameInputLabel: 'name',
    slugInputLabel: 'slug',
    emptyStatusesListMessage: 'No Task statuses yet.',
    createStatusTitle: 'Create Task status',
  },
  labelsPage: {
    nameInputLabel: 'name',
    emptyLabelsListMessage: 'No Labels yet.',
    createLabelTitle: 'Create Label',
  },
  tasksPage: {
    assigneeSelectionLabel: 'assignee',
    titleInputLabel: 'Title',
    contentInputLabel: 'content',
    statusSelectionLabel: 'Status',
    labelSelectionLabel: 'Label',
    createTaskTitle: 'Create Task',
    createAtLabel: 'Created at',
    idLabel: 'Id',
    tasksMenuItemLabel: 'Tasks',
  },
  commonEls: {
    createLabel: 'Create',
    saveLabel: 'Save',
    deleteLabel: 'Delete',
    showLabel: 'Show',
    editLabel: 'Edit',
    saveMessage: 'Element created',
    updateMessage: 'Element updated',
    deleteMessage: 'Element deleted',
    deleteAllCheckboxLabel: 'Select all',
  }
}
