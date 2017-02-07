import React from 'react'

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

  componentDidMount() {
        $('.tabular .item').tab();
  }


  render() {
    return (   
        <div>
                <div id="tabmenu" className="ui top attached tabular menu">
                        <div><a className="item" onClick={this.props.sidebarToggler}><i className="sidebar icon"></i></a></div>
                        {this.props.tabnames.map((tab,i)=>{
                                if(i==0)
                                {
                                        return(<a className="active item" key={i.toString()} data-tab={i.toString()}>{this.props.tabnames[i]}</a>);
                                }
                                else if(i<(this.props.tabnames.length - 1))
                                {
                                        return(<a className="item" key={i.toString()} data-tab={i.toString()}>{this.props.tabnames[i]}</a>);
                                }
                                else
                                {
                                        return(<a className="item" key={i.toString()} onClick={()=>{this.props.addTab(); $('.tabular .item').tab();}}>{this.props.tabnames[i]}</a>);
                                }
                        })}
                </div>
                {
                        this.props.tabarray.map((tabcontent,i)=>{
                                if(i==0)
                                {
                                        return(<div className="ui bottom attached active tab segment" key={i.toString()} data-tab={i.toString()}><TabContent/></div>);
                                }
                                else if(i<(tabcontent.length - 1))
                                {
                                        return(<div className="ui bottom attached tab segment" key={i.toString()} data-tab={i.toString()}><TabContent/></div>);
                                }
                                else
                                {
                                        return(<div className="ui bottom attached tab segment" key={i.toString()}><TabContent/></div>);
                                }
                        })
                }
        </div>
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
