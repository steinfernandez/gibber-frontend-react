/*
 * action types
 */

export const ADD_TAB = 'ADD_TAB'
export const REMOVE_TAB = 'REMOVE_TAB'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

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

