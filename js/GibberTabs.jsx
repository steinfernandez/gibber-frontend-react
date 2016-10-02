import React from 'react'

import {
  Tabs,
  TabMenu,
  Tab,
  MenuItem
} from 'semantic-react'

let GUIClass = React.createClass({
  getInitialState() { return { active:1,tabnames:["First","Second","Third","+"] ,tabarray:["content1","content2","content3","content4"] };},

  onNewTab(e) { 
        let tn = this.state.tabnames;
        let ta = this.state.tabarray;
        tn[tn.length-1] = "Tab"+(tn.length-1).toString();
        tn.push("+");
        ta[ta.length-1] = "this is new tab content";
        ta.push("");
        this.setState({tabnames:tn,tabarray:ta});
},

  blah: function(){ console.log("hi");}.bind(this),

  render() {
    let tabnames=this.state.tabnames;
    let tabarray=this.state.tabarray;
    return (
      <Tabs onTabChange={(val) => this.setState({ active: val })} activeTab={this.state.active}>
        <TabMenu>
                {tabnames.map(function(tab,i){ 
                        if(i<tabnames.length-1)
                        {
                                return(<MenuItem menuValue={i+1} key={i}>{tabnames[i]}</MenuItem>);
                        }
                        else
                        {
                                return(<MenuItem menuValue={i+1} key={i} onClick={blah()}>{tabnames[i]}</MenuItem>);                                
                        }
                })}
        </TabMenu>
        {tabarray.map(function(tabcontent,i){ return(<Tab value={i+1} key={i}>{tabcontent}</Tab>)})}
      </Tabs>
    )
  }
})

export default GUIClass
