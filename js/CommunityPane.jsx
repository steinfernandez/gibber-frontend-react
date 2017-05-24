import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addBreadcrumb} from './actions/actions.js';
import {removeBreadcrumb} from './actions/actions.js';
import {updateUserGroups} from './actions/actions.js';
import {updateTargetGroup} from './actions/actions.js';

class CommunityPane extends React.Component{

        constructor(props)
        {
                super(props);
                this.state = { active:1 };
                this.showCreateGroupPane = this.showCreateGroupPane.bind(this);
                this.showViewGroupPane = this.showViewGroupPane.bind(this);
                this.showFriendsPane = this.showFriendsPane.bind(this);
                this.activateCreateGroupForm = this.activateCreateGroupForm.bind(this);
                this.activateViewGroupList = this.activateViewGroupList.bind(this);
                this.activateGroupInfoButton = this.activateGroupInfoButton.bind(this);
                this.showDeleteConfirmationModal = this.showDeleteConfirmationModal.bind(this);
                this.hideDeleteConfirmationModal = this.hideDeleteConfirmationModal.bind(this);
        }

        componentDidMount()
        {
                $('.creategrouppane').transition('hide');
                $('.viewgrouppane').transition('hide');
                $('.friendspane').transition('hide');

                //activate group deletion modalId
                $('#dcmodal').modal();
                //activate confirmation button in deletion modal
                $('#dcbutton')
                .api({
                    url: window.location.origin+"/groupdestroy",
                    method: 'POST',
                    on: 'click',
                    beforeSend: (settings) => { settings.data.groupname = this.props.targetGroup; console.log(settings.data); return settings; },
                    successTest: function(response)
                    {
                      if(response && response.success)
                      {
                        return response.success;
                      }
                      else
                        return false;
                    },
                    onSuccess: (response) => {
                                                console.log(response);
                                                let newarr = this.props.userGroups.slice();
                                                newarr.splice(newarr.indexOf(this.props.targetGroup),1);
                                                this.props.updateUserGroups(newarr);
                                                this.hideDeleteConfirmationModal();
                                             }
                     });
        }

        showDeleteConfirmationModal(groupname)
        {
                console.log("dctrigger "+groupname);
                this.props.updateTargetGroup(groupname);
                $('#dcmodal').modal('show');
        }

        hideDeleteConfirmationModal()
        {
                this.props.updateTargetGroup(null);
                $('#dcmodal').modal('hide');
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
                                                                let groupname = {group}.group;
                                                                let infoID = {group}.group+"info";
                                                                let addID = {group}.group+"add";
                                                                let removeID = {group}.group+"remove";
                                                                let deleteID = {group}.group+"delete";
                                                                let managebuttons =     <div className="ui icon buttons">
                                                                                        <button className="ui icon tiny basic button" id={infoID}><i className="info icon"/></button>
                                                                                        <button className="ui icon tiny basic button" id={addID}><i className="add user icon"/></button>
                                                                                        <button className="ui icon tiny basic button" id={removeID}><i className="remove user icon"/></button>
                                                                                        <button className="ui icon tiny basic button" id={deleteID} onClick={()=>{this.showDeleteConfirmationModal(groupname)}}><i className="trash icon"/></button>
                                                                                        </div>
                                                                return(<a className="item" key={i} data-groupname={group}>{group.substring(group.lastIndexOf('/')+1)} {managebuttons}</a>)
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
                let deleteconfirmation = <div className="ui modal" id='dcmodal'>
                                                <i className="close icon"/>
                                                <div className="header"> Confirm Group Deletion </div>
                                                <div className="description">
                                                        <div className="ui header">Are you sure you want to delete this group?</div>
                                                        <p>This action cannot be undone.</p>
                                                </div>
                                                <div className="actions">
                                                        <div className="ui black deny button">Nope</div>
                                                        <div className="ui positive right labeled icon button" id="dcbutton">Yep<i className="checkmark icon"/></div>
                                                </div>
                                          </div>
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
                                {deleteconfirmation}
                        </div>
                        <div className="friendspane">
                                friends and stuff
                        </div>
                </div>
                );
        }

}

const mapStateToProps = function (state) {
        return{ breadcrumbValues: state.breadcrumbValues, currentUser: state.currentUser, userGroups: state.userGroups, targetGroup: state.targetGroup };
}

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators({ addBreadcrumb: addBreadcrumb, removeBreadcrumb: removeBreadcrumb, updateUserGroups: updateUserGroups, updateTargetGroup:updateTargetGroup }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(CommunityPane);
