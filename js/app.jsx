import React from 'react';
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
import GUIClass from './GibberTabs.jsx'


class App extends React.Component {
  render() {
/*css goes here*/

let gibbertabStyle = {
        backgroundColor: "#ffffff",
        display: "inline-block",
        borderRadius: "10px",
        float: "left"
    };

let sidemenuStyle = {
        display: "inline-block",
        float: "left"
    };

    return (
        <div>
           <div style={sidemenuStyle}>
                <ul>
                       <li><Button>one</Button></li>
                       <li><Button>two</Button></li>
                       <li><Button>three</Button></li>
                </ul>
           </div>
              <div style={gibbertabStyle}><GUIClass/></div>
        </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
