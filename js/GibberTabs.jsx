import React from 'react'
import TabContent from './TabContent.jsx';
import SureModal from './SureModal.jsx';
import LoginModal from './LoginModal.jsx';
import LogoutButton from './LogoutButton.jsx';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addTab} from './actions/actions.js'

class GUIClass extends React.Component
{
        constructor(props)
        {
                super(props);
                this.state = { active:1};
                this.refreshCMInstances = this.refreshCMInstances.bind(this);
        }

        componentDidMount()
        {
                $('.tabular .item').tab();
        }

        componentDidUpdate()
        {
                $('.tabular .item').tab();
        }

        refreshCMInstances()
        {
                $('.CodeMirror').each((i,e)=>{e.CodeMirror.refresh();})
        }

        render()
        {
                let store = this.props.store;
                let greeting = null;
                if(this.props.currentUser==null)
                {
                greeting = <div>Not currently logged in.<LoginModal store={store} modalId={"modal999"}/></div>;
                }
                else
                {
                greeting = <div>Currently logged in as {this.props.currentUser}.<LogoutButton store={store}/></div>;
                }
                return (
                <div>
                        <div id="tabmenu" className="ui top attached tabular menu">
                                {this.props.tabs.map((tab,i)=>{
                                        let tabNameSplit = this.props.tabs[i]._id.split('/')
                                        let tabName = tabNameSplit[ tabNameSplit.length - 1 ]
                                        if(i==0)
                                        {
                                          return(<a className="active item" key={i.toString()} onClick={this.refreshCMInstances} data-tab={i.toString()}>{tabName}<SureModal modalId={"sm"+i.toString()}/></a>);
                                        }
                                        else if(i<(this.props.tabs.length - 1))
                                        {
                                                return(<a className="item" key={i.toString()} onClick={this.refreshCMInstances} data-tab={i.toString()}>{tabName}<SureModal modalId={"sm"+i.toString()}/></a>);
                                        }
                                        else
                                        {
                                                return(<a className="item" key={i.toString()} onClick={()=>{this.props.addTab(); $('.tabular .item').tab(); this.refreshCMInstances();}}>{tabName}</a>);
                                        }
                                })}
                        </div>
                        {
                                this.props.tabs.map((tab,i)=>{
                                        if(i==0)
                                        {
                                                return(<div className="ui bottom attached active tab segment" key={i.toString()} data-tab={i.toString()}><TabContent tabContentID={i} store={store}/></div>);
                                        }
                                        else if(i<(this.props.tabs.length - 1))
                                        {
                                                return(<div className="ui bottom attached tab segment" key={i.toString()} data-tab={i.toString()}><TabContent tabContentID={i} store={store}/></div>);
                                        }
                                        else
                                        {
                                                //return(/*<div className="ui bottom attached tab segment" key={i.toString()}><TabContent tabContentID={i} store={store}/>*/<div key={i.toString()}></div>);
                                                return null;
                                        }
                                })
                        }
                </div>
                )
        }
}

const mapStateToProps = function (state)
{
        return{ tabs: state.tabs, currentUser: state.currentUser };
}

const mapDispatchToProps = function (dispatch)
{
        return bindActionCreators({addTab: addTab}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GUIClass);
