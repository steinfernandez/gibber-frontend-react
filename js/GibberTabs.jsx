import React from 'react'

import {
  Tabs,
  TabMenu,
  Tab,
  MenuItem
} from 'semantic-react'

import TabContent from './TabContent.jsx'

class GUIClass extends React.Component{

  constructor(props) {
    super(props);
    this.state = { active:1,tabnames:["First","Second","Third","+"] ,tabarray:["content1","content2","content3","content4"] };
    this.onNewTab = this.onNewTab.bind(this);
    this.blah = this.blah.bind(this);
  }

  onNewTab(e) { 
        let tn = this.state.tabnames;
        let ta = this.state.tabarray;
        tn[tn.length-1] = "Tab"+(tn.length-1).toString();
        tn.push("+");
        ta[ta.length-1] = "this is new tab content";
        ta.push("");
        this.setState({tabnames:tn,tabarray:ta});
}

  blah() { console.log("hi");}

  render() {
    let tabnames=store.getState().tabnames;
    let tabarray=store.getState().tabarray;
    return (
      <Tabs onTabChange={(val) => this.setState({ active: val })} activeTab={this.state.active}>
        <TabMenu>
                {tabnames.map((tab,i)=>{ 
                        if(i<tabnames.length-1)
                        {
                                return(<MenuItem menuValue={i+1} key={i}>{tabnames[i]}</MenuItem>);
                        }
                        else
                        {
                                return(<div onClick={this.onNewTab}><MenuItem menuValue={i+1} key={i}>{tabnames[i]}</MenuItem></div>);                                
                        }
                })}
        </TabMenu>
        {tabarray.map(function(tabcontent,i){ return(<Tab value={i+1} key={i}><TabContent/></Tab>)})}
      </Tabs>
    )
  }
}

export default GUIClass
