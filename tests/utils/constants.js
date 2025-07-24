export const username = 'Alex'
export const password = 'qwe123asd'
export const wrongEmailToPut1 = 'google.com'
export const wrongEmailToPut2 = '@google.com'
export const wrongEmailToPut3 = 'google@google'
export const dataForCreate = {
  email: 'alex@gmail.com',
  firstName: 'Alex1',
  lastName: 'Alex2',
  name: 'Testing',
  slug: 'to_test',
}
export const dataForView = {
  email: 'john@google.com',
  firstName: 'John',
  lastName: 'Doe', 
  name: 'Draft',
  slug: 'draft',
}
export const userToEdit = 'john@google.com'
export const statusToEdit = 'Draft'
export const userToDelete = 'john@google.com'
export const statusToDelete = 'Draft'
export const newDataForEdit = {
  email: 'google@google.com',
  firstName: 'Mike',
  lastName: 'Jonson',
  name: 'Draft1',
  slug: 'draft1',
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
  }
}
