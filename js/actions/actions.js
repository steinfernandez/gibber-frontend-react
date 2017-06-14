/*
 * action types
 */

export const ADD_TAB = 'ADD_TAB'
export const REMOVE_TAB = 'REMOVE_TAB'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const UPDATE_CURRENT_NOTIFICATIONS = 'UPDATE_CURRENT_NOTIFICATIONS';
export const UPDATE_CURRENT_GIBLETS = 'UPDATE_CURRENT_GIBLETS';
export const UPDATE_USER_GROUPS = 'UPDATE_USER_GROUPS';
export const UPDATE_TARGET_GROUP = 'UPDATE_TARGET_GROUP';
export const UPDATE_TARGET_GROUP_MEMBERS = 'UPDATE_TARGET_GROUP_MEMBERS';
export const UPDATE_TARGET_GROUP_PENDING_MEMBERS = 'UPDATE_TARGET_GROUP_PENDING_MEMBERS';
export const OPEN_GIBLET = 'OPEN_GIBLET';
export const PUBLISH_GIBLET = 'PUBLISH_GIBLET';
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

export function publishGiblet(tabId, newName)
{
        return { type: PUBLISH_GIBLET, tabId, newName }
}

export function updateGibletFileData(tabId, filedata)
{
        return { type: UPDATE_GIBLET_FILE_DATA, tabId, filedata }
}

export function addBreadcrumb(value)
{
        return { type: ADD_BREADCRUMB, value }
}

export function removeBreadcrumb(number)
{
        return { type: REMOVE_BREADCRUMB, number }
}
