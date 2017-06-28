import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {login} from './actions/actions.js';


class LoginModal extends React.Component
{
        constructor(props)
        {
                super(props);
                this.state = { active: false };
                this.activateModal = this.activateModal.bind(this);
                this.closeModal = this.closeModal.bind(this);
        }

        closeModal()
        {
                $('#'+this.props.modalId.toString()).modal('toggle');
        }

        activateModal()
        {
                //$('#'+this.props.modalId.toString()).modal('toggle');
                if(!$('#'+this.props.modalId.toString()).modal('is active'))
                {
                        $('#'+this.props.modalId.toString()).modal('toggle');
                }
        }

        componentDidMount()
        {
                //validation rules
                $('.ui.form')
                .form({
                  fields: {
                    username: {
                      identifier  : 'username',
                      rules: [
                        {
                          type   : 'empty',
                          prompt : 'Please enter your username'
                        }
                      ]
                    },
                    password: {
                      identifier  : 'password',
                      rules: [
                        {
                          type   : 'empty',
                          prompt : 'Please enter your password'
                        },
                        {
                          type   : 'length[6]',
                          prompt : 'Your password must be at least 6 characters'
                        }
                      ]
                    }
                  }
                });
                //submit button api
                $('#'+this.props.modalId.toString()+' form')
                  .api({
                    url: window.location.origin+"/login",
                    method: 'POST',
                    serializeForm: true,
                    beforeSend: function(settings)
                    {
                      console.log(settings.data);
                      return settings;
                    },
                    successTest: function(response)
                    {
                      console.log(response);
                      if(response && response.success)
                      {
                        console.log("server responded with successful login");
                        return response.success;
                      }
                      return false;
                    },
                    onSuccess: (response) => { this.props.login(response.username); this.closeModal(); }
                     });
        }

        render()
        {
                let store = this.props.store;

                var formdivStyle = {
                                float: "right",
                                padding: 10,
                                margin: 50,
                        };

                return (
                        <div>
                                <button className="ui basic button"  onClick={this.activateModal}><i className="sign in icon"></i>Login</button>
                                <div className="ui modal" id={this.props.modalId}>
                                        <i className="close icon"></i>
                                        <div className="header">
                                                Sign in to Gibber
                                        </div>
                                        <div className="image content">
                                                <div className="image">
                                                        <i className="sign in icon"/>
                                                </div>
                                                <div className="formdiv" style={formdivStyle}>
                                                        <form className="ui large form">
                                                        <div className="ui stacked segment">
                                                                <div className="field">
                                                                        <div className="ui left icon input">
                                                                                <i className="user icon"></i>
                                                                                <input type="text" name="username" placeholder="Gibber username"/>
                                                                        </div>
                                                                </div>
                                                                <div className="field">
                                                                        <div className="ui left icon input">
                                                                                <i className="lock icon"></i>
                                                                                <input type="password" name="password" placeholder="Password"/>
                                                                        </div>
                                                                </div>
                                                                <div className="ui fluid large teal submit button">Login</div>
                                                        </div>
                                                        <div className="ui error message"></div>
                                                        </form>
                                                </div>
                                        </div>
                                </div>
                        </div>
                );
        }
}

const mapStateToProps = function (state)
{
        return{ currentUser: state.currentUser };
}

const mapDispatchToProps = function (dispatch)
{
        return bindActionCreators({login: login}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
