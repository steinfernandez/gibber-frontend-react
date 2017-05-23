import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addBreadcrumb} from './actions/actions.js';
import {removeBreadcrumb} from './actions/actions.js';
import {updateUserGroups} from './actions/actions.js';

class CommunityPane extends React.Component{

        constructor(props) {
                super(props);
                this.state = { active:1 };
        this.showCreateGroupPane = this.showCreateGroupPane.bind(this);
        this.showViewGroupPane = this.showViewGroupPane.bind(this);
        this.showFriendsPane = this.showFriendsPane.bind(this);
        this.activateCreateGroupForm = this.activateCreateGroupForm.bind(this);
        this.activateViewGroupList = this.activateViewGroupList.bind(this);
        this.activateGroupInfoButton = this.activateGroupInfoButton.bind(this);
  }

        componentDidMount()
        {
                $('.creategrouppane').transition('hide');
                $('.viewgrouppane').transition('hide');
                $('.friendspane').transition('hide');


        }

        activateCreateGroupForm()
        {
                console.log("activating create group form");
                $('.creategroupform')
                .api({
                    url: window.location.origin+"/groupcreate",
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
                        console.log("successful group creation");
                        return response.success;
                      }
                      return false;
                    },
                    onSuccess: (response) => { console.log("group created") }
                     });
        }

        activateViewGroupList()
        {
                $('.viewgroupbutton')
                .api({
                    url: window.location.origin+"/usercheckinfo",
                    method: 'POST',
                    on: 'click',
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
                    onSuccess: (response) => { console.log("onsuccess"); this.props.updateUserGroups(response.response.grouplist);}
                     });
        }

        activateGroupInfoButton(groupname)
        {
                console.log("activating group delete buttons");
                let identifier = '#'+groupname+'delete';
                console.log(identifier);
                console.log($(identifier));
                $(identifier)
                .api({
                    url: window.location.origin+"/groupdestroy",
                    method: 'POST',
                    on: 'click',
                    beforeSend: function(settings) { settings.data.groupname = groupname; console.log(settings.data); return settings; },
                    successTest: function(response)
                    {
                      if(response && response.success)
                      {
                        return response.success;
                      }
                      else
                        return false;
                    },
                    onSuccess: (response) => { console.log(response); }
                     });
        }

        showCreateGroupPane()
        {
                if($('.communitymenu').transition('is visible'))
                {
                        $('.communitymenu').transition('slide right');
                }
                $('.creategrouppane').transition('slide left');
                this.props.addBreadcrumb(2, "Create Group");
        }

        showViewGroupPane()
        {
                if($('.communitymenu').transition('is visible'))
                {
                        $('.communitymenu').transition('slide right');
                }
                $('.viewgrouppane').transition('slide left');
                this.props.addBreadcrumb(2, "View Group");
        }

        showFriendsPane()
        {
                if($('.communitymenu').transition('is visible'))
                {
                        $('.communitymenu').transition('slide right');
                }
                $('.friendspane').transition('slide left');
                this.props.addBreadcrumb(2, "Friends");
        }

        render()
        {
                let viewgrouplist = null;
                if(this.props.currentUser==null)
                {
                        viewgrouplist = <div>Please log in to view your groups.</div>
                }
                else
                {
                        viewgrouplist = this.props.userGroups.map(
                                                        (group,i) =>
                                                        {
                                                                let infoID = {group}.group+"info";
                                                                let addID = {group}.group+"add";
                                                                let removeID = {group}.group+"remove";
                                                                let deleteID = {group}.group+"delete";
                                                                let infobutton = <button className="ui icon tiny basic button" id={infoID}><i className="info icon"/></button>
                                                                let addbutton = <button className="ui icon tiny basic button" id={addID}><i className="add user icon"/></button>
                                                                let removebutton = <button className="ui icon tiny basic button" id={removeID}><i className="remove user icon"/></button>
                                                                let deletebutton = <button className="ui icon tiny basic button" id={deleteID}><i className="trash icon"/></button>
                                                                return(<a className="item" key={i} data-groupname={group}>{group} {infobutton} {addbutton} {removebutton} {deletebutton}</a>)
                                                        }
                                                );
                        this.activateViewGroupList();
                        this.props.userGroups.map(
                                        (group,i) =>
                                        {
                                                setTimeout(this.activateGroupInfoButton,300,{group}.group);
                                        }
                                        );
                }
                let creategroupform = null;
                if(this.props.currentUser==null)
                {
                        creategroupform = <div>Please log in to create a group.</div>
                }
                else
                {
                        creategroupform = <form className="ui creategroupform form">
                                                <div className="ui stacked segment">
                                                        <div className="field">
                                                                <label>Group Name</label>
                                                                <div className="ui left icon input">
                                                                        <i className="file text icon"></i>
                                                                        <input type="text" name="groupname"/>
                                                                </div>
                                                        </div>
                                                        <div className="ui fluid large teal submit button">Create Group</div>
                                                </div>
                                                <div className="ui error message"></div>
                                        </form>;
                        this.activateCreateGroupForm();
                }
                return(
                <div>
                        <div className="communitymenu">
                                <div className="massive fluid ui vertical menu">
                                        <a className="item" onClick={this.showCreateGroupPane}>Create Group</a>
                                        <a className="item viewgroupbutton" onClick={this.showViewGroupPane}>View Groups</a>
                                        <a className="item" onClick={this.showFriendsPane}>Friends</a>
                                </div>
                        </div>
                        <div className="creategrouppane">
                                {creategroupform}
                        </div>
                        <div className="viewgrouppane">
                                {viewgrouplist}
                        </div>
                        <div className="friendspane">
                                friends and stuff
                        </div>
                </div>
                );
        }

}

const mapStateToProps = function (state) {
        return{ breadcrumbValues: state.breadcrumbValues, currentUser: state.currentUser, userGroups: state.userGroups };
}

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators({ addBreadcrumb: addBreadcrumb, removeBreadcrumb: removeBreadcrumb, updateUserGroups: updateUserGroups }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(CommunityPane);
