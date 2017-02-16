import React from 'react';
import {render} from 'react-dom';
import GUIClass from './GibberTabs.jsx'
import GibberSidebar from './Sidebar.jsx'
import { createStore } from 'redux';
import gibberReducer from './reducers/reducers.js';
import { Provider } from 'react-redux';


let store = createStore(gibberReducer);


class App extends React.Component {

  componentDidMount() {
        /* Define API endpoints once globally */
        $.fn.api.settings.api = {
                                  'createNewUser' : '/createNewUser',
                                  'login'         : '/login',
                                  'add user'      : '/add/{id}',
                                  'follow user'   : '/follow/{id}',
                                  'search'        : '/search/?query={value}'
                                };        
        }

  render() {
    return (
        <Provider store={store}>
        <GibberSidebar store={store}>
        </GibberSidebar>
        </Provider>
    );
  }
}

render(<App/>, document.getElementById('app'));
