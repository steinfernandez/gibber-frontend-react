import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addBreadcrumb} from './actions/actions.js';
import {removeBreadcrumb} from './actions/actions.js';

class UserProfile extends React.Component
{
        constructor(props)
        {
                super(props);
                this.state = { active:1, userdata:null };
                this.retrieveUserData = this.retrieveUserData.bind(this);
                this.updateUserData = this.updateUserData.bind(this);
        }

        componentDidMount()
        {
        }

        componentDidUpdate()
        {
                //activate buttons
                var userprofilename = this.props.userprofilename;
                if(this.state.userdata!=null)
                {
                        console.log("activating all profile buttons");
                        $('#'+this.state.userdata._id+'_userprofilepane .addfriendbutton')
                        .api({
                            url: window.location.origin+"/sendfriendrequest",
                            method: 'POST',
                            serializeForm: true,
                            beforeSend: function(settings)
                            {
                              settings.data.username = userprofilename;
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
                        $('#'+this.state.userdata._id+'_userprofilepane .unfriendbutton')
                        .api({
                            url: window.location.origin+"/removefriend",
                            method: 'POST',
                            serializeForm: true,
                            beforeSend: function(settings)
                            {
                              settings.data.username = userprofilename;
                              console.log(settings.data);
                              return settings;
                            },
                            successTest: function(response)
                            {
                              console.log(response);
                              if(response && response.success)
                              {
                                console.log("successfully removed friend");
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
                        $('#'+this.state.userdata._id+'_userprofilepane .followuserbutton')
                        .api({
                            url: window.location.origin+"/followuser",
                            method: 'POST',
                            serializeForm: true,
                            beforeSend: function(settings)
                            {
                              settings.data.username = userprofilename;
                              console.log(settings.data);
                              return settings;
                            },
                            successTest: function(response)
                            {
                              console.log(response);
                              if(response && response.success)
                              {
                                console.log("successfully followed user");
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
                                this.updateUserData();
                            }
                        });
                        $('#'+this.state.userdata._id+'_userprofilepane .unfollowuserbutton')
                        .api({
                            url: window.location.origin+"/unfollowuser",
                            method: 'POST',
                            serializeForm: true,
                            beforeSend: function(settings)
                            {
                              settings.data.username = userprofilename;
                              console.log(settings.data);
                              return settings;
                            },
                            successTest: function(response)
                            {
                              console.log(response);
                              if(response && response.success)
                              {
                                console.log("successfully unfollowed user");
                                return response.success;
                              }
                              return false;
                            },
                            onSuccess: (response) =>
                            {
                                console.log(response);
                                //var tempfoundusers = [];
                                //tempfoundusers.push(response.response);
                                this.updateUserData();
                            }
                        });
                        $('#'+this.state.userdata._id+'_userprofilepane').transition('hide');
                }
        }

        retrieveUserData()
        {
                var userprofilename = this.props.userprofilename;
                if(this.state.userdata==null)
                {
                        $('#'+this.props.userprofilename+"_userprofile")
                        .api({
                            url: window.location.origin+"/getuser",
                            on:'now',
                            method: 'POST',
                            serializeForm: true,
                            beforeSend: function(settings)
                            {
                              settings.data.username = userprofilename;
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
                                this.setState({userdata: response.response});
                                //expand profile pane
                                $('#'+this.props.userprofilename+'_userprofilepane').transition('show');
                            }
                        });
                }
                else
                {
                        $('#'+this.state.userdata._id+'_userprofilepane').transition('hide');
                        this.setState({userdata:null});
                }
        }

        updateUserData()
        {
                var userprofilename = this.props.userprofilename;
                $('#'+this.props.userprofilename+"_userprofile")
                .api({
                    url: window.location.origin+"/getuser",
                    on:'now',
                    method: 'POST',
                    serializeForm: true,
                    beforeSend: function(settings)
                    {
                      settings.data.username = userprofilename;
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
                        this.setState({userdata: response.response});
                        $('#'+this.state.userdata._id+'_userprofilepane').transition('show');
                    }
                });
        }

        render()
        {
                var userprofilepane = null;
                var arrowicon = null;
                if(this.state.userdata!=null)
                {
                        console.log(this.state.userdata);
                        var addfriendbutton = null;
                        if((this.props.currentUser!=null)&&(this.props.currentUser!=this.props.userprofilename))
                        {
                                if(this.state.userdata.friends.indexOf(this.props.currentUser)==-1)
                                {
                                        addfriendbutton = <button className="ui mini basic button addfriendbutton"><i className="add user icon"/></button>
                                }
                                else
                                {
                                        addfriendbutton = <button className="ui mini basic button unfriendbutton"><i className="remove user icon"/></button>
                                }
                        }
                        var followuserbutton = null;
                        if((this.props.currentUser!=null)&&(this.props.currentUser!=this.props.userprofilename))
                        {
                                if(this.state.userdata.followers.indexOf(this.props.currentUser)==-1)
                                {
                                        followuserbutton = <button className="ui mini basic button followuserbutton"><i className="alarm icon"/></button>
                                }
                                else
                                {
                                        followuserbutton = <button className="ui mini basic button unfollowuserbutton"><i className="alarm mute icon"/></button>
                                }
                        }
                        userprofilepane =
                                <div className="userprofilepane" id={this.props.userprofilename+"_userprofilepane"}>
                                        <div className="ui list">
                                                <div className="item">
                                                        <i className="user icon"/>
                                                        <div className="content">
                                                                <div className="header">Username</div>
                                                                <div className="description">{this.state.userdata._id}</div>
                                                        </div>
                                                </div>
                                                <div className="item">
                                                        <i className="mail icon"/>
                                                        <div className="content">
                                                                <div className="header">E-Mail</div>
                                                                <div className="description">{this.state.userdata.email}</div>
                                                        </div>
                                                </div>
                                                <div className="item">
                                                        <i className="calendar icon"/>
                                                        <div className="content">
                                                                <div className="header">Join Date</div>
                                                                <div className="description">{this.state.userdata.joinDate}</div>
                                                        </div>
                                                </div>
                                                <div className="item">
                                                        <i className="linkify icon"/>
                                                        <div className="content">
                                                                <div className="header">Website</div>
                                                                <div className="description">{this.state.userdata.website}</div>
                                                        </div>
                                                </div>
                                                <div className="item">
                                                        <i className="file text icon"/>
                                                        <div className="content">
                                                                <div className="header">About Me</div>
                                                                <div className="description">{this.state.userdata.aboutMe}</div>
                                                        </div>
                                                </div>
                                        </div>
                                        {addfriendbutton}{followuserbutton}
                                </div>
                        arrowicon = <i className="angle down icon"/>
                }
                else
                {
                        arrowicon = <i className="angle right icon"/>
                }
                return( <div>
                        <a className="item userprofile" onClick={()=>{this.retrieveUserData();}} id={this.props.userprofilename+"_userprofile"}>{arrowicon}{this.props.userprofilename}</a>
                        {userprofilepane}
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

export default connect(mapStateToProps,mapDispatchToProps)(UserProfile);
