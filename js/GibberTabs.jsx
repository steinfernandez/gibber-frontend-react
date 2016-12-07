import React from 'react'

import {
  Tabs,
  TabMenu,
  Tab,
  MenuItem,
  Icon
} from 'semantic-react'

import TabContent from './TabContent.jsx';
import SureModal from './SureModal.jsx';
import LoginModal from './LoginModal.jsx';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addTab} from './actions/actions.js'

class GUIClass extends React.Component{

  constructor(props) {
    super(props);
    this.state = { active:1};
  }


  render() {
    return (
      <Tabs onTabChange={(val) => this.setState({ active: val })} activeTab={this.state.active}>
        <TabMenu>
        <div><a className="item" onClick={this.props.sidebarToggler}><i className="sidebar icon"></i></a></div>
                {this.props.tabnames.map((tab,i)=>{ 
                        if(i<this.props.tabnames.length-1)
                        {
                                return(<MenuItem menuValue={i+1} key={i}>{this.props.tabnames[i]}<SureModal/></MenuItem>);
                        }
                        else
                        {
                                return(<div onClick={() => this.props.addTab()}><MenuItem menuValue={i+1} key={i}>{this.props.tabnames[i]}</MenuItem></div>);                                
                        }
                })}
        <a className="ui item floated right">
        <LoginModal/></a>
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
