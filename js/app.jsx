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

                // Refresh CodeMirror
                $('.CodeMirror').each(function(i, el){
                    el.CodeMirror.refresh();
                });
                {/* Note: Provider component must encompass the rest of the app to allow access to the store*/}
                return (
                        <div>
                        <Provider store={store}>
                                <div>
                                        <TitleBar store={store}/>
                                        <GibberSidebar store={store}/>
                                </div>
                        </Provider>
                        </div>
                );
        }
}

if(typeof window !== 'undefined')
{
        render(<App/>, document.getElementById('app'));
}
