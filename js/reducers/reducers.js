var clone = require('clone');

const initialState = {
                        currentUser: null,
                        currentGiblets: [],
                        tabs:  [{tabName: "Tab 1", tabContent: "content1", published: false},
                                {tabName: "Tab 2", tabContent: "content2", published: false},
                                {tabName: "Tab 3", tabContent: "content3", published: false},
                                {tabName: "+", tabContent: "", published: false}],
                        tabNames:["Tab first","Tab 2","Tab 3","+"],
                        tabContent:["content1","content2","content3"]
                     };

function gibberReducer(state = initialState, action)
{
        switch(action.type)
        {
                case "ADD_TAB": {let tabs_temp = state.tabs.slice();
                                tabs_temp[tabs_temp.length - 1].tabName = "Tab "+ tabs_temp.length.toString();
                                tabs_temp[tabs_temp.length - 1].tabContent = "here's some empty text";
                                tabs_temp.push({tabName:"+", tabContent:""});
                                return(Object.assign({}, state, {tabs: tabs_temp}));
                                break;}
                case "LOGIN":   return(Object.assign({}, state, {currentUser: action.text}));
                                break;
                case "LOGOUT":  return(Object.assign({}, state, {currentUser: null}));
                                break;
                case "UPDATE_CURRENT_GIBLETS":
                                return(Object.assign({}, state, {currentGiblets: action.newGiblets}));
                                break;
                case "OPEN_GIBLET":
                                {let tabs_temp = state.tabs.slice();
                                let newTabName = action.gibletName.substring(action.gibletName.lastIndexOf('/')+1); /*get the name after the last slash*/
                                tabs_temp[tabs_temp.length - 1].tabName = action.gibletName;
                                tabs_temp[tabs_temp.length - 1].tabContent = action.gibletContent;
                                tabs_temp[tabs_temp.length - 1].published = true;
                                tabs_temp.push({tabName:"+", tabContent:""});
                                return(Object.assign({}, state, {tabs: tabs_temp}));
                                break;}
                case "PUBLISH_GIBLET":
                                {let tabs_temp = state.tabs.slice();
                                tabs_temp[action.tabId].tabName = action.newName;
                                tabs_temp[action.tabId].published = true;
                                return(Object.assign({}, state, {tabs: tabs_temp}));
                                break;}
                default:        return state;
        }
}

export default gibberReducer;
