import React from 'react';
import LoginModal from './LoginModal.jsx';
import LogoutButton from './LogoutButton.jsx';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {queuePopup} from './actions/actions.js';
import {login} from './actions/actions.js';

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
                $('#titlebar')
                .api({
                    url: window.location.origin+"/loginStatus",
                    method: 'GET',
                    on: 'now',
                    beforeSend: function(settings) { console.log(settings.data); return settings; },
                    successTest: function(response)
                    {
                      if(response && response.success)
                      {
                        return response.success;
                      }
                      else
                        return false;
                    },
                    onSuccess: (response) => { console.log("user was already logged in"); console.log(response); this.props.login(response.username);}
                });

        }

        componentDidUpdate()
        {

        }

        toggleSidebar()
        {
                $('.ui.sidebar').sidebar('toggle');
        }


        render()
        {
                let greeting = null;
                let store = this.props.store;
                if(this.props.currentUser==null)
                {
                greeting = <div style={{"marginLeft":"auto","marginRight":"1%"}}><LoginModal store={store} modalId={"modal999"}/></div>;
                }
                else
                {
                greeting = <div style={{"marginLeft":"auto","marginRight":"1%"}}>welcome, {this.props.currentUser}.<LogoutButton store={store}/></div>;
                }
                let titlestyle={position:"fixed",top:"0px"};
                return(
                        <div id="titlebar" className="ui top attached main menu">
                                <div><a className="item" onClick={this.toggleSidebar}><i className="sidebar icon"></i></a></div>
                                <h1>gibber</h1>
                                {greeting}
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
        return bindActionCreators({ queuePopup: queuePopup, login:login }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(TitleBar);
