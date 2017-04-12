var clone = require('clone');

const initialState = {
                        currentUser: null,
                        currentGiblets: [],
                        tabs:  [{_id: "Tab 1", text: "content1", published: false},
                                {_id: "Tab 2", text: "content2", published: false},
                                {_id: "Tab 3", text: "content3", published: false},
                                {_id: "+", text: "", published: false}]
                     };

function gibberReducer(state = initialState, action)
{
        switch(action.type)
        {
                case "ADD_TAB": {let tabs_temp = state.tabs.slice();
                                tabs_temp[tabs_temp.length - 1]._id = "Tab "+ tabs_temp.length.toString();
                                tabs_temp[tabs_temp.length - 1].text = "here's some empty text";
                                tabs_temp[tabs_temp.length - 1].published = false;
                                tabs_temp.push({_id:"+", text:""});
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
                                //let newTabName = action.gibletName.substring(action.gibletName.lastIndexOf('/')+1); /*get the name after the last slash*/
                                let newTab = Object.assign({},action.gibletData,{published: true});
                                tabs_temp.pop();
                                tabs_temp.push(newTab);
                                console.log(action.gibletData);
                                tabs_temp.push({_id:"+", text:""});
                                console.log(tabs_temp);
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
