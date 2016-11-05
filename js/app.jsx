import React, { Component, PropTypes } from 'react';
import {render} from 'react-dom';
import { DropdownMenu } from 'semantic-react';
import { MenuItem } from 'semantic-react';
import { Tab } from 'semantic-react';
import { Tabs } from 'semantic-react';
import { TabMenu } from 'semantic-react';
import { Button } from 'semantic-react';
import { Segment } from 'semantic-react';
import { Step } from 'semantic-react';
import { Steps } from 'semantic-react';
import { Icon } from 'semantic-react';
import { Header } from 'semantic-react';
import { Content } from 'semantic-react';
import { Message } from 'semantic-react';
import { Iconbutton } from 'semantic-react';
import { Label } from 'semantic-react';
import { Table } from 'semantic-react';
import { Td } from 'semantic-react';
import { Tr } from 'semantic-react';
import { Column } from 'semantic-react';
import { Grid } from 'semantic-react';
import GUIClass from './GibberTabs.jsx'
import GibberSidebar from './Sidebar.jsx'
import { createStore } from 'redux';
import gibberReducer from './reducers/reducers.js';
import { Provider } from 'react-redux';

//let Sidebar = Semantify.Sidebar;

let store = createStore(gibberReducer);


class App extends React.Component {
  render() {
/*css goes here*/

let gibbertabdivStyle = {
        backgroundColor: "#ffffff",
        display: "inline-block",
        borderRadius: "10px",
        height: "90vh",
        width: "90vw"
    };

let guiclassStyle = {
        padding: "20px 20px 20px 20px"
}

let mainDivWrapperStyle = {
        display: "flex",
        flexDirection: "row"
}

let sidemenuStyle = {
        display: "inline-block",
        float: "left"
    };

    return (
        <Provider store={store}>
        <div>
        <Grid>
        <Column>
        </Column>
        <Column>
        <GibberSidebar>
           <div style={gibbertabdivStyle}><GUIClass store={store} style={guiclassStyle}/></div>
        </GibberSidebar>
        </Column>
        </Grid>
        </div>
        </Provider>
    );
  }
}

render(<App/>, document.getElementById('app'));
