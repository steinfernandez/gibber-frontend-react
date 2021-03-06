/*
 * action types
 */

export const ADD_TAB = 'ADD_TAB'
export const CLOSE_TAB = 'CLOSE_TAB'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const UPDATE_CURRENT_NOTIFICATIONS = 'UPDATE_CURRENT_NOTIFICATIONS';
export const QUEUE_POPUP = 'QUEUE_POPUP';
export const DEQUEUE_POPUP = 'DEQUEUE_POPUP';
export const DISMISS_POPUP = 'DISMISS_POPUP';
export const UPDATE_CURRENT_GIBLETS = 'UPDATE_CURRENT_GIBLETS';
export const UPDATE_USER_GROUPS = 'UPDATE_USER_GROUPS';
export const UPDATE_TARGET_GROUP = 'UPDATE_TARGET_GROUP';
export const UPDATE_TARGET_GROUP_MEMBERS = 'UPDATE_TARGET_GROUP_MEMBERS';
export const UPDATE_TARGET_GROUP_PENDING_MEMBERS = 'UPDATE_TARGET_GROUP_PENDING_MEMBERS';
export const OPEN_GIBLET = 'OPEN_GIBLET';
export const UPDATE_GIBLET_TEXT = 'UPDATE_GIBLET_TEXT';
export const PUBLISH_GIBLET = 'PUBLISH_GIBLET';
export const SET_GIBLET_MODIFIED = 'SET_GIBLET_MODIFIED';
export const UPDATE_GIBLET_FILE_DATA = 'UPDATE_GIBLET_FILE_DATA';
export const SAVE_GIBLET = 'SAVE_GIBLET';
export const ADD_BREADCRUMB = 'ADD_BREADCRUMB';
export const REMOVE_BREADCRUMB = 'REMOVE_BREADCRUMB';

/*
 * other constants
 */

/*
 * action creators
 */

export function addTab()
{
        return { type: ADD_TAB }
}

export function closeTab(tabIndex)
{
        return { type: CLOSE_TAB, tabIndex }
}

export function login(text)
{
        return { type: LOGIN, text }
}

export function logout()
{
        return { type: LOGOUT }
}

export function updateCurrentNotifications(newNotifications)
{
        return { type: UPDATE_CURRENT_NOTIFICATIONS, newNotifications }
}

export function queuePopup(notification)
{
        return { type: QUEUE_POPUP, notification }
}

export function dequeuePopup()
{
        return { type: DEQUEUE_POPUP }
}

export function dismissPopup(index)
{
        return { type: DISMISS_POPUP, index }
}

export function updateCurrentGiblets(newGiblets)
{
        return { type: UPDATE_CURRENT_GIBLETS, newGiblets }
}

export function updateUserGroups(grouplist)
{
        return { type: UPDATE_USER_GROUPS, grouplist}
}

export function updateTargetGroup(groupname)
{
        return { type: UPDATE_TARGET_GROUP, groupname }
}

export function updateTargetGroupMembers(memberarray)
{
        return { type: UPDATE_TARGET_GROUP_MEMBERS, memberarray }
}

export function updateTargetGroupPendingMembers(pendingmemberarray)
{
        return { type: UPDATE_TARGET_GROUP_PENDING_MEMBERS, pendingmemberarray }
}

export function openGiblet(gibletData)
{
        return { type: OPEN_GIBLET, gibletData }
}

export function updateGibletText(index,text)
{
        return { type: UPDATE_GIBLET_TEXT, index, text }
}

export function publishGiblet(tabId, newName)
{
        return { type: PUBLISH_GIBLET, tabId, newName }
}

export function updateGibletFileData(tabId, filedata)
{
        return { type: UPDATE_GIBLET_FILE_DATA, tabId, filedata }
}

export function setGibletModified(tabId, modified)
{
        return { type: SET_GIBLET_MODIFIED, tabId, modified }
}

export function addBreadcrumb(value)
{
        return { type: ADD_BREADCRUMB, value }
}

export function removeBreadcrumb(number)
{
        return { type: REMOVE_BREADCRUMB, number }
}
