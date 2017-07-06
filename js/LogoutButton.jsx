import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {logout} from './actions/actions.js'

class LogoutButton extends React.Component
{
        constructor(props)
        {
                super(props);
                this.state = { active: false }
        }

        componentDidMount()
        {
                $('button')
                .api({
                    url: window.location.origin+"/logout",
                    method: 'GET',
                    successTest: function(response)
                    {
                      console.log(response);
                      if(response && response.success)
                      {
                        console.log("server responded with successful logout, byebye ");
                        return response.success;
                      }
                      else
                        return false;
                    },
                    onSuccess: (response) => { console.log("onsuccessbutton"); this.props.logout();}
                     });
        }

        render()
        {
                return(
                        <div style={{"display":"inline-block","paddingLeft":"0.5em","paddingTop":"0.15em"}}>
                                <button className="ui basic button">
                                        <i className="sign out icon"></i>
                                        Logout?
                                </button>
                        </div>
                );
        }

}

const mapStateToProps = function(state)
{
        return{ currentUser: state.currentUser };
}

const mapDispatchToProps = function(dispatch)
{
        return bindActionCreators({logout: logout}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LogoutButton);
