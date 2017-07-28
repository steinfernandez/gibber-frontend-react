import React from 'react';
import UserProfile from './UserProfile.jsx'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addBreadcrumb} from './actions/actions.js';
import {removeBreadcrumb} from './actions/actions.js';

class UsersPane extends React.Component
{
        constructor(props)
        {
                super(props);
                this.state = { active:1, foundusers:[], friends:[] };
                this.showSearchUserPane = this.showSearchUserPane.bind(this);
                this.showFriendsPane = this.showFriendsPane.bind(this);
        }

        componentDidMount()
        {
                $('.searchuserpane').transition('hide');
                $('.searchuserpane .searchuserbutton')
                .api({
                    url: window.location.origin+"/getuser",
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
                        console.log("successfully retrieved user info");
                        return response.success;
                      }
                      return false;
                    },
                    onSuccess: (response) =>
                    {
                        console.log(response);
                        var tempfoundusers = [];
                        tempfoundusers.push(response.response);
                        this.setState({foundusers: tempfoundusers});
                    }
                });
        }

        componentDidUpdate()
        {
                this.state.foundusers.map((user,i) => {
                        console.log(user);
                        console.log("activating add friend button for "+user._id);
                        $('#'+user._id+'pane .addfriendbutton')
                        .api({
                            url: window.location.origin+"/sendfriendrequest",
                            method: 'POST',
                            serializeForm: true,
                            beforeSend: function(settings)
                            {
                              settings.data.username = user._id;
                              console.log(settings.data);
                              return settings;
                            },
                            successTest: function(response)
                            {
                              console.log(response);
                              if(response && response.success)
                              {
                                console.log("successfully sent friend request to user");
                                return response.success;
                              }
                              return false;
                            },
                            onSuccess: (response) =>
                            {
                                console.log(response);
                                //var tempfoundusers = [];
                                //tempfoundusers.push(response.response);
                                //this.setState({foundusers: tempfoundusers});
                            }
                        });
                })
        }

        showFriendsPane()
        {
                if(this.props.currentUser!=null)
                {
                        $('.getfriendsbutton')
                        .api({
                            url: window.location.origin+"/getuser",
                            method: 'POST',
                            on: 'now',
                            serializeForm: true,
                            beforeSend: (settings) =>
                            {
                              settings.data.username = this.props.currentUser;
                              console.log(settings.data);
                              return settings;
                            },
                            successTest: function(response)
                            {
                              console.log(response);
                              if(response && response.success)
                              {
                                console.log("successfully retrieved user info");
                                return response.success;
                              }
                              return false;
                            },
                            onSuccess: (response) =>
                            {
                                console.log(response);
                                this.setState({friends: response.response.friends});
                                $('.usermenu').transition('hide');
                                $('.friendspane').transition('show');
                                this.props.removeBreadcrumb(3);
                                this.props.addBreadcrumb("Friends");
                            }
                        });
                }
        }

        showSearchUserPane()
        {
                $('.usermenu').transition('hide');
                $('.searchuserpane').transition('show');
                this.props.removeBreadcrumb(3);
                this.props.addBreadcrumb("Search User");
        }

        render()
        {
                let foundusers = null;
                console.log(this.state.foundusers);
                foundusers = this.state.foundusers.map((user,i)=>{
                        var fulinkid=user._id+"link";
                        return(<UserProfile key={i} userprofilename={user._id}/>);
                })
                let friends = null;
                console.log(this.state.friends);
                friends = this.state.friends.map((user,i)=>{
                        return(<UserProfile key={i} userprofilename={user}/>);
                })
                return(
                        <div>
                                <div className="usermenu" style={{display:"inline-block !important", overflow:"hidden"}}>
                                        <div className="massive fluid ui vertical menu">
                                                <a className="item" onClick={this.showSearchUserPane}>Search Users</a>
                                                <a className="item getfriendsbutton" onClick={this.showFriendsPane}>Friends</a>
                                        </div>
                                </div>
                                <div className="searchuserpane">
                                        <form className="searchuserform ui form">
                                                <div className="field">
                                                        <label>Search User</label>
                                                        <input type="text" name="username"/>
                                                </div>
                                                <button className="ui button searchuserbutton" type="submit">Submit</button>
                                        </form>
                                        <div className="massive fluid ui vertical menu founduserlist">
                                                {foundusers}
                                        </div>
                                </div>
                                <div className="friendspane">
                                        <div className="massive fluid ui vertical menu friendslist">
                                                {friends}
                                        </div>
                                </div>
                        </div>
                );
        }
}

const mapStateToProps = function(state)
{
        return{ breadcrumbValues: state.breadcrumbValues, currentUser: state.currentUser };
}

const mapDispatchToProps = function(dispatch)
{
        return bindActionCreators({ addBreadcrumb: addBreadcrumb, removeBreadcrumb: removeBreadcrumb }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(UsersPane);
