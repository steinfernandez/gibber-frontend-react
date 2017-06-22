import React from 'react';
import {render} from 'react-dom';
import GUIClass from './GibberTabs.jsx'
import GibberSidebar from './Sidebar.jsx'
import TitleBar from './TitleBar.jsx';
import { createStore } from 'redux';
import gibberReducer from './reducers/reducers.js';
import { Provider } from 'react-redux';


let store = createStore(gibberReducer);


class App extends React.Component
{
        componentDidMount()
        {
        }


        render()
        {
                return (
                        <Provider store={store}>
                                        <GibberSidebar store={store}>
                                        </GibberSidebar>
                        </Provider>
                );
        }
}

if(typeof window !== 'undefined')
{
        render(<App/>, document.getElementById('app'));
}
