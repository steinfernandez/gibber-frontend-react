var clone = require('clone');

const initialState = { 
                        currentUser: null, 
                        tabnames:["Tab first","Tab 2","Tab 3","+"],
                        tabarray:["content1","content2","content3","content4"] 
                     };

function gibberReducer(state = initialState, action) 
{
        switch(action.type)
        {
                case "ADD_TAB": let tabnames_temp = state.tabnames.slice();
                                tabnames_temp[tabnames_temp.length-1] = "Tab "+(tabnames_temp.length).toString();
                                tabnames_temp.push("+");
                                let tabarray_temp = state.tabarray.slice();
                                tabarray_temp.push("here's some empty text");
                                return(Object.assign({}, state, {tabnames:tabnames_temp, tabarray:tabarray_temp} ));
                                break;
                case "LOGIN":   return(Object.assign({}, state, {currentUser: action.text}));
                                break;
                case "LOGOUT":  return(Object.assign({}, state, {currentUser: null}));
                                break;
                default:        return state;
        }
}

export default gibberReducer;
