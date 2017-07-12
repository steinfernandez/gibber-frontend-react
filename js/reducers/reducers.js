var clone = require('clone');

const defaultCode = `var test = "blah";

if( test === 'blah' ) return;

var b = (c,d)=> {
  console.log( 'answer', c+d )
  return c + d
}

b()

let test2 = {
  blah:1,
  blah2:2
}`

const initialState = {
                        currentUser: null,
                        currentNotifications: [],
                        popupQueue: [],
                        //popupQueue: [{header:"Test Header",body:"this is the text in the notification body"},{header:"Test Header 2",body:"this is the text in the notification body"},{header:"Test Header 3",body:"this is the text in the notification body"}],
                        currentGiblets: [],
                        userGroups: [],
                        targetGroup: null,
                        targetGroupMembers:[],
                        targetGroupPendingMembers:[],
                        breadcrumbValues: ["Home"],
                        tabs:  [{_id: "Tab 1", text: defaultCode, published: false, filedata:{}},
                                {_id: "+", text: "", published: false, filedata:{}}]
                     };

function gibberReducer(state = initialState, action)
{
        switch(action.type)
        {
                case "ADD_TAB": {let tabs_temp = state.tabs.slice();
                                tabs_temp[tabs_temp.length - 1]._id = "Tab "+ tabs_temp.length.toString();
                                tabs_temp[tabs_temp.length - 1].text = defaultCode
                                tabs_temp[tabs_temp.length - 1].published = false;
                                tabs_temp.push({_id:"+", text:""});

                                if( tabs_temp.length > 1 ) {
                                  //$( '#tabmenu' ).removeClass( 'hidden' )
                                  $('.tab.segment').css({ top:'2.5em' })
                                  //$( '#tabmenu' )[0].style = '' // remove random display:none that is being added
                                }

                                return(Object.assign({}, state, {tabs: tabs_temp}));

                                break;}
                case "CLOSE_TAB":
                                {let tabs_temp = state.tabs.slice();
                                console.log("tabindex "+action.tabIndex);
                                tabs_temp.splice(action.tabIndex,1);
                                if(action.tabIndex>0)
                                {
                                        setTimeout(function(){
                                                $('#tabmenu .item')[action.tabIndex-1].click();
                                                //$.tab('change tab',action.tabIndex-1);
                                                console.log('closing')

                                                // XXX + button should not be a tab!
                                                // check for two while + button is a tab...
                                                if( tabs_temp.length <= 2 ) {
                                                  $('.tab.segment').css({ top:0 })
                                                  console.log( 'HIDING')
                                                }
                                        },100);
                                }
                                console.log(tabs_temp);
                                return(Object.assign({}, state, {tabs: tabs_temp}));
                                break;}
                case "LOGIN":   return(Object.assign({}, state, {currentUser: action.text}));
                                break;
                case "LOGOUT":  return(Object.assign({}, state, {currentUser: null}));
                                break;
                case "UPDATE_CURRENT_NOTIFICATIONS":
                                {let notif_temp = state.currentNotifications.slice();
                                notif_temp = JSON.parse(action.newNotifications).slice();
                                return(Object.assign({}, state, {currentNotifications:notif_temp}));
                                break;}
                case "QUEUE_POPUP":
                                {let popup_temp = state.popupQueue.slice();
                                popup_temp.push(action.notification);
                                return(Object.assign({}, state, {popupQueue:popup_temp}));
                                break;}
                case "DEQUEUE_POPUP":
                                {let popup_temp = state.popupQueue.slice();
                                popup_temp.shift();
                                return(Object.assign({}, state, {popupQueue:popup_temp}));
                                break;}
                case "DISMISS_POPUP":
                                {let popup_temp = state.popupQueue.slice();
                                popup_temp.splice(action.index,1);
                                return(Object.assign({}, state, {popupQueue:popup_temp}));
                                break;}
                case "UPDATE_CURRENT_GIBLETS":
                                return(Object.assign({}, state, {currentGiblets: action.newGiblets}));
                                break;
                case "UPDATE_USER_GROUPS":
                                return(Object.assign({}, state, {userGroups: action.grouplist}));
                                break;
                case "UPDATE_TARGET_GROUP":
                                return(Object.assign({}, state, {targetGroup: action.groupname}));
                                break;
                case "UPDATE_TARGET_GROUP_MEMBERS":
                                return(Object.assign({}, state, {targetGroupMembers: action.memberarray}));
                                break;
                case "UPDATE_TARGET_GROUP_PENDING_MEMBERS":
                                return(Object.assign({}, state, {targetGroupPendingMembers: action.pendingmemberarray}));
                                break;
                case "OPEN_GIBLET":
                                {let tabs_temp = state.tabs.slice();
                                //let newTabName = action.gibletName.substring(action.gibletName.lastIndexOf('/')+1); /*get the name after the last slash*/
                                let newTab = Object.assign({},action.gibletData,{published: true});
                                tabs_temp.pop();
                                tabs_temp.push(newTab);
                                console.log(action.gibletData);
                                tabs_temp.push({_id:"+", text:""});

                                if( tabs_temp.length > 1 ) {
                                  //$( '#tabmenu' ).removeClass( 'hidden' )
                                  $('.tab.segment').css({ top:'2.5em' })
                                  //$( '#tabmenu' )[0].style = '' // remove random display:none that is being added
                                }
                                console.log(tabs_temp);
                                return(Object.assign({}, state, {tabs: tabs_temp}));

                                break;}
                case "UPDATE_GIBLET_TEXT":
                                {let tabs_temp = state.tabs.slice();
                                tabs_temp[action.index].text = action.text;
                                return(Object.assign({}, state, {tabs: tabs_temp}));
                                break;}
                case "PUBLISH_GIBLET":
                                {let tabs_temp = state.tabs.slice();
                                tabs_temp[action.tabId].tabName = action.newName;
                                tabs_temp[action.tabId].published = true;
                                return(Object.assign({}, state, {tabs: tabs_temp}));
                                break;}
                case "UPDATE_GIBLET_FILE_DATA":
                                {let tabs_temp = state.tabs.slice();
                                console.log(action.filedata);
                                tabs_temp[action.tabId] = Object.assign({},action.filedata,{published:true});
                                console.log("updated giblet data");
                                console.log(tabs_temp[action.tabId]);
                                return(Object.assign({}, state, {tabs: tabs_temp}));
                                break;}
                case "ADD_BREADCRUMB":
                                {let breadcrumbValues_temp = state.breadcrumbValues.slice();
                                breadcrumbValues_temp.push(action.value);
                                return(Object.assign({}, state, {breadcrumbValues: breadcrumbValues_temp}));
                                break;}
                case "REMOVE_BREADCRUMB":
                                {let breadcrumbValues_temp = state.breadcrumbValues.slice();
                                let k = breadcrumbValues_temp.length;
                                for(let i=action.number;i<k;i++)
                                {
                                        breadcrumbValues_temp.pop();
                                }
                                return(Object.assign({}, state, {breadcrumbValues: breadcrumbValues_temp}));
                                break;}
                default:        return state;
        }
}

export default gibberReducer;
