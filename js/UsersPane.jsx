import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addBreadcrumb} from './actions/actions.js';
import {removeBreadcrumb} from './actions/actions.js';

class UsersPane extends React.Component
{
        constructor(props)
        {
                super(props);
                this.state = { active:1, foundusers:[] };
                this.showSearchUserPane = this.showSearchUserPane.bind(this);
        }

        componentDidMount()
        {
                $('.fupane').each(function() { $(this).transition('hide'); })
                $('.searchuserpane').transition('hide');
                $('.searchuserpane .searchuserbutton')
                .api({
                    url: window.location.origin+"/searchuser",
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
                $('.fupane').each(function() { $(this).transition('hide'); })
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

        showSearchUserPane()
        {
                $('.usermenu').transition('hide');
                $('.searchuserpane').transition('show');
                this.props.removeBreadcrumb(3);
                this.props.addBreadcrumb("Search User");
        }

        showFUPane(id)
        {
                let fupaneid = id+"pane";
                console.log(fupaneid);
                $('.founduserlist').transition('hide');
                $('.searchuserform').transition('hide');
                $('#'+fupaneid).transition('show');
        }

        render()
        {
                let foundusers = null;
                let fupanes = null;
                console.log(this.state.foundusers);
                foundusers = this.state.foundusers.map((user,i)=>{
                        var fulinkid=user._id+"link";
                        return(<a className="item fulink" id={fulinkid} key={i} onClick={ ()=>{ console.log(user);this.showFUPane(user._id) } }>{user._id}</a>);
                })
                fupanes = this.state.foundusers.map((user,i)=>{
                        var addfriendbutton = null;
                        if(this.props.currentUser!=null)
                        {
                                console.log(user.friends.indexOf(this.props.currentUser));
                                if(user.friends.indexOf(this.props.currentUser)==-1)
                                {
                                        addfriendbutton = <button className="ui mini basic button addfriendbutton"><i className="add user icon"/></button>
                                }
                                else
                                {
                                        addfriendbutton = <button className="ui mini basic button unfriendbutton"><i className="remove user icon"/></button>
                                }
                        }
                        var userpaneid = user._id+"pane";
                        return(
                                <div className="fupane" key={i} id={userpaneid}>
                                        <div className="ui list">
                                                <div className="item">
                                                        <i className="user icon"/>
                                                        <div className="content">
                                                                <div className="header">Username</div>
                                                                <div className="description">{user._id}</div>
                                                        </div>
                                                </div>
                                                <div className="item">
                                                        <i className="mail icon"/>
                                                        <div className="content">
                                                                <div className="header">E-Mail</div>
                                                                <div className="description">{user.email}</div>
                                                        </div>
                                                </div>
                                                <div className="item">
                                                        <i className="calendar icon"/>
                                                        <div className="content">
                                                                <div className="header">Join Date</div>
                                                                <div className="description">{user.joinDate}</div>
                                                        </div>
                                                </div>
                                                <div className="item">
                                                        <i className="linkify icon"/>
                                                        <div className="content">
                                                                <div className="header">Website</div>
                                                                <div className="description">{user.website}</div>
                                                        </div>
                                                </div>
                                                <div className="item">
                                                        <i className="file text icon"/>
                                                        <div className="content">
                                                                <div className="header">About Me</div>
                                                                <div className="description">{user.aboutMe}</div>
                                                        </div>
                                                </div>
                                        </div>
                                        {addfriendbutton}
                                </div>
                        );
                })
                return(
                        <div>
                                <div className="usermenu" style={{display:"inline-block !important", overflow:"hidden"}}>
                                        <div className="massive fluid ui vertical menu">
                                                <a className="item" onClick={this.showSearchUserPane}>Search Users</a>
                                                <a className="item">Friends</a>
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
                                        {fupanes}
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
