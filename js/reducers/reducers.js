var clone = require('clone');

const initialState = {
                        currentUser: null,
                        currentGiblets: [],
                        tabs:  [{tabName: "Tab 1", tabContent: "content1"},
                                {tabName: "Tab 2", tabContent: "content2"},
                                {tabName: "Tab 3", tabContent: "content3"},
                                {tabName: "+", tabContent: ""}],
                        tabNames:["Tab first","Tab 2","Tab 3","+"],
                        tabContent:["content1","content2","content3"]
                     };

function gibberReducer(state = initialState, action)
{
        switch(action.type)
        {
                case "ADD_TAB": /*{let tabNames_temp = state.tabNames.slice();
                                tabNames_temp[tabNames_temp.length-1] = "Tab "+(tabNames_temp.length).toString();
                                tabNames_temp.push("+");
                                let tabContent_temp = state.tabContent.slice();
                                tabContent_temp.push("here's some empty text");
                                return(Object.assign({}, state, {tabNames:tabNames_temp, tabContent:tabContent_temp} ));
                                break;}*/
                                {let tabs_temp = state.tabs.slice();
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
                                /*{let tabNames_temp = state.tabNames.slice();
                                let newTabName = action.gibletName.substring(action.gibletName.lastIndexOf('/')+1); /*get the name after the last slash*/
                                /*tabNames_temp[tabNames_temp.length - 1] = newTabName;
                                tabNames_temp.push("+");
                                let tabContent_temp = state.tabContent.slice();
                                tabContent_temp.push(action.gibletContent);
                                return(Object.assign({}, state, {tabNames:tabNames_temp, tabContent: tabContent_temp} ));
                                break;}*/
                                {let tabs_temp = state.tabs.slice();
                                let newTabName = action.gibletName.substring(action.gibletName.lastIndexOf('/')+1); /*get the name after the last slash*/
                                tabs_temp[tabs_temp.length - 1].tabName = newTabName;
                                tabs_temp[tabs_temp.length - 1].tabContent = action.gibletContent;
                                tabs_temp.push({tabName:"+", tabContent:""});
                                return(Object.assign({}, state, {tabs: tabs_temp}));
                                break;}
                default:        return state;
        }
}

export default gibberReducer;
