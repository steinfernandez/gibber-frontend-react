/*
 * action types
 */

export const ADD_TAB = 'ADD_TAB'
export const REMOVE_TAB = 'REMOVE_TAB'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const UPDATE_CURRENT_GIBLETS = 'UPDATE_CURRENT_GIBLETS';
export const OPEN_GIBLET = 'OPEN_GIBLET';
export const PUBLISH_GIBLET = 'PUBLISH_GIBLET';
export const SAVE_GIBLET = 'SAVE_GIBLET';

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

export function openGiblet(gibletData) {
  return { type: OPEN_GIBLET, gibletData }
}

export function publishGiblet(tabId, newName) {
  return { type: PUBLISH_GIBLET, tabId, newName }
}
