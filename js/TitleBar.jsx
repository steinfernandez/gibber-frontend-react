import React from 'react';
import LoginModal from './LoginModal.jsx';
import LogoutButton from './LogoutButton.jsx';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {queuePopup} from './actions/actions.js';

class TitleBar extends React.Component
{
        constructor(props)
        {
                super(props);
                this.state = { active:1 };
                this.toggleSidebar = this.toggleSidebar.bind(this);
        }

        componentDidMount()
        {

        }

        componentDidUpdate()
        {

        }

        toggleSidebar()
        {
                console.log("toggling sidebar");
                $('.ui.sidebar').sidebar('toggle');
        }


        render()
        {
                let greeting = null;
                let store = this.props.store;
                if(this.props.currentUser==null)
                {
                greeting = <div style={{"marginLeft":"auto","marginRight":"1%"}}>Not currently logged in.   <LoginModal store={store} modalId={"modal999"}/></div>;
                }
                else
                {
                greeting = <div style={{"marginLeft":"auto","marginRight":"1%"}}>Currently logged in as {this.props.currentUser}.<LogoutButton store={store}/></div>;
                }
                let titlestyle={position:"fixed",top:"0px"};
                return(
                        <div className="ui top attached main menu">
                                <div><a className="item" onClick={this.toggleSidebar}><i className="sidebar icon"></i></a></div>{greeting}
                        </div>
                );
        }
}

const mapStateToProps = function(state)
{
        return{ currentUser: state.currentUser, popupQueue: state.popupQueue };
}

const mapDispatchToProps = function(dispatch)
{
        return bindActionCreators({ queuePopup: queuePopup }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(TitleBar);
