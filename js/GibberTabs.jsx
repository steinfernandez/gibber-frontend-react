import React from 'react'

import {
  Tabs,
  TabMenu,
  Tab,
  MenuItem
} from 'semantic-react'

import TabContent from './TabContent.jsx'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addTab} from './actions/actions.js'

class GUIClass extends React.Component{

  constructor(props) {
    super(props);
    this.state = { active:1};
    this.onNewTab = this.onNewTab.bind(this);
    this.blah = this.blah.bind(this);
  }

  onNewTab(e) { 
        let tn = this.props.tabnames;
        let ta = this.props.tabarray;
        tn[tn.length-1] = "Tab"+(tn.length-1).toString();
        tn.push("+");
        ta[ta.length-1] = "this is new tab content";
        ta.push("");
        this.setState({tabnames:tn,tabarray:ta});
}

  blah() { console.log("hi");}

  render() {
    return (
      <Tabs onTabChange={(val) => this.setState({ active: val })} activeTab={this.state.active}>
        <TabMenu>
                {this.props.tabnames.map((tab,i)=>{ 
                        if(i<this.props.tabnames.length-1)
                        {
                                return(<MenuItem menuValue={i+1} key={i}>{this.props.tabnames[i]}</MenuItem>);
                        }
                        else
                        {
                                return(<div onClick={() => this.props.addTab()}><MenuItem menuValue={i+1} key={i}>{this.props.tabnames[i]}</MenuItem></div>);                                
                        }
                })}
        </TabMenu>
        {this.props.tabarray.map(function(tabcontent,i){ return(<Tab value={i+1} key={i}><TabContent/></Tab>)})}
      </Tabs>
    )
  }
}

const mapStateToProps = function (state) {
        return{ tabnames: state.tabnames, tabarray: state.tabarray };
}

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators({addTab: addTab}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GUIClass);
