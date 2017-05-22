/*
 * action types
 */

export const ADD_TAB = 'ADD_TAB'
export const REMOVE_TAB = 'REMOVE_TAB'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const UPDATE_CURRENT_GIBLETS = 'UPDATE_CURRENT_GIBLETS';
export const UPDATE_USER_GROUPS = 'UPDATE_USER_GROUPS';
export const OPEN_GIBLET = 'OPEN_GIBLET';
export const PUBLISH_GIBLET = 'PUBLISH_GIBLET';
export const SAVE_GIBLET = 'SAVE_GIBLET';
export const ADD_BREADCRUMB = 'ADD_BREADCRUMB';
export const REMOVE_BREADCRUMB = 'REMOVE_BREADCRUMB';

/*
 * other constants
 */

/*
 * action creators
 */

export function addTab() {
  return { type: ADD_TAB }
}

export function login(text) {
  return { type: LOGIN, text }
}

export function logout() {
  return { type: LOGOUT }
}

export function updateCurrentGiblets(newGiblets) {
  return { type: UPDATE_CURRENT_GIBLETS, newGiblets}
}

export function updateUserGroups(grouplist) {
  return { type: UPDATE_USER_GROUPS, grouplist}
}

export function openGiblet(gibletData) {
  return { type: OPEN_GIBLET, gibletData }
}

export function publishGiblet(tabId, newName) {
  return { type: PUBLISH_GIBLET, tabId, newName }
}

export function addBreadcrumb(position, value) {
  return { type: ADD_BREADCRUMB, position, value }
}

export function removeBreadcrumb(position) {
  return { type: REMOVE_BREADCRUMB, position }
}
