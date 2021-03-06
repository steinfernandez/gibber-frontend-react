import React from 'react';
import UserProfile from './UserProfile.jsx';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addBreadcrumb} from './actions/actions.js';
import {removeBreadcrumb} from './actions/actions.js';
import {updateUserGroups} from './actions/actions.js';
import {updateTargetGroup} from './actions/actions.js';
import {updateTargetGroupMembers} from './actions/actions.js';
import {updateTargetGroupPendingMembers} from './actions/actions.js';

class GroupPane extends React.Component
{
        constructor(props)
        {
                super(props);
                this.state = { active:1 };
                this.showCreateGroupPane = this.showCreateGroupPane.bind(this);
                this.showViewGroupPane = this.showViewGroupPane.bind(this);
                this.activateCreateGroupForm = this.activateCreateGroupForm.bind(this);
                this.showGroupIDPane = this.showGroupIDPane.bind(this);
                this.showAddMemberForm = this.showAddMemberForm.bind(this);
                this.activateDeleteGroupButton = this.activateDeleteGroupButton.bind(this);
                this.activateViewMemberButtons = this.activateViewMemberButtons.bind(this);
                this.showViewMemberPane = this.showViewMemberPane.bind(this);
                this.showDeleteConfirmationModal = this.showDeleteConfirmationModal.bind(this);
                this.hideDeleteConfirmationModal = this.hideDeleteConfirmationModal.bind(this);
        }

        componentDidMount()
        {
                /*this.props.updateUserGroups(["group1","group2","group3"]);*/
                /*$('.viewgrouppane').transition('hide');*/
                $('.creategrouppane').transition('hide');
                $('.groupidpane').each(function() { $(this).transition('hide'); })
                $('.inviteusers').dropdown({
                        allowAdditions: true
                });
                $('addmemberform input').on('keypress', function(e) {
                    return e.which !== 13;
                });
                $('.inviteusers').dropdown('refresh');
                this.activateAddMemberForm();
                $('#dcmodal').modal();
                this.activateDeleteGroupButton();
        }

        showCreateGroupPane()
        {
                //hide all other panes, at least under the group menu
                //$('.pane').each(() => { if($(this).transition('is visible')) { $(this).transition('hide'); console.log($this);} })
                if($('.viewgrouppane').transition('is visible'))
                {
                        $('.viewgrouppane').transition('hide');
                }
                //show create group pane
                if($('.creategrouppane').transition('is visible')==false)
                {
                        $('.creategrouppane').transition('show');
                }
                this.props.addBreadcrumb("Create Group");
        }

        showViewGroupPane()
        {
                //retrieve latest usergroups by simulating a click on group button
                $('#groupbutton').api('query');
                //hide all other panes, at least under the group menu
                //$('.pane').each(() => { if($(this).transition('is visible')) { $(this).transition('hide'); console.log($this);} })
                //show view group pane
                $('.viewgrouppane').transition('show');
                this.props.removeBreadcrumb(2);
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
                    onSuccess: (response) => { console.log("group created"); $('.creategrouppane').transition('hide'); this.showViewGroupPane(); }
                     });
        }

        activateAddMemberForm()
        {
                $('.addmemberform')
                .api({
                    url: window.location.origin+"/groupaddpendingusers",
                    method: 'POST',
                    serializeForm: true,
                    beforeSend: (settings) =>
                    {
                        let formuserlist = $('.inviteusers option:selected');
                        let newusers = [];
                        for(let i=0;i<formuserlist.length;i++)
                        {
                                newusers.push(formuserlist[i].value);
                        }
                        settings.data = Object.assign({},settings.data,{newusers:newusers,groupname:this.props.targetGroup});
                        console.log(settings.data);
                        return settings;
                    },
                    successTest: function(response)
                    {
                      console.log(response);
                      if(response && response.success)
                      {
                        console.log("invites sent");
                        return response.success;
                      }
                      return false;
                    },
                    onSuccess: (response) =>
                    {
                        console.log("invites sent");
                        $('.addmemberpane').transition('hide');
                        let paneID=this.props.targetGroup+"id";
                        paneID=paneID.slice(paneID.lastIndexOf("/")+1);
                        this.showGroupIDPane(paneID);
                    }
                     });
        }

        activateDeleteGroupButton()
        {
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
                                                this.showViewGroupPane();
                                             }
                     });
        }

        activateViewMemberButtons()
        {
                console.log("attempting to activate view member buttons");
                this.props.userGroups.map( (group,i) =>
                                {
                                        let groupid={group}.group+"id";
                                        groupid=groupid.slice(groupid.lastIndexOf("/")+1);
                                        console.log("#"+groupid+" .viewbutton");
                                        $("#"+groupid+" .viewbutton")
                                        .api({
                                            url: window.location.origin+"/groupviewusers",
                                            method: 'POST',
                                            on: 'click',
                                            beforeSend: (settings) => { settings.data.groupname = {group}.group; console.log(settings.data); return settings; },
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
                                                                        console.log(response.response);
                                                                        //update redux
                                                                        this.props.updateTargetGroupMembers(response.response.members);
                                                                        this.props.updateTargetGroupPendingMembers(response.response.pendingmembers);
                                                                        console.log(groupid);
                                                                        $("#"+groupid).transition('hide');
                                                                        this.showViewMemberPane();
                                                                     }
                                             });
                                })
        }

        showGroupIDPane(id)
        {
                console.log("showGroupIDPane");
                $('.viewgrouppane').transition('hide');
                $('#'+id).transition('show');
                this.props.addBreadcrumb(id.slice(0,id.length-2));
                this.props.removeBreadcrumb(3);
        }

        showAddMemberForm(targetGroup)
        {
                console.log("targetGroup "+targetGroup);
                let paneID=targetGroup+"id";
                paneID=paneID.slice(paneID.lastIndexOf("/")+1);
                //update target group
                this.props.updateTargetGroup(targetGroup);
                //hide group pane
                $('#'+paneID).transition('hide');
                //show add member form pane
                $('.addmemberpane').transition('show');
                this.props.addBreadcrumb("Invite Members");
                setTimeout(()=>{console.log(this.props.breadcrumbValues);},3000);
        }

        showViewMemberPane()
        {
                console.log("showviewmemberpane");
                $('.viewmemberpane').transition('show');
                this.props.addBreadcrumb("View Members");
        }

        render()
        {
                let grouppanes=null;
                if(this.props.currentUser!=null)
                {
                        grouppanes = this.props.userGroups.map( (group,i) =>
                                                        {
                                                                let groupid={group}.group+"id";
                                                                groupid=groupid.slice(groupid.lastIndexOf("/")+1);
                                                                console.log(groupid);
                                                                return (        <div key={i} className="massive fluid ui vertical menu groupidpane transition hidden" id={groupid}>
                                                                                        <a className="item">{group}</a>
                                                                                        <a className="viewbutton item">View members</a>
                                                                                        <a className="item" onClick={()=>{this.showAddMemberForm({group}.group)}}>Add members</a>
                                                                                        <a className="item">Remove members</a>
                                                                                        <a className="item" onClick={()=>{this.showDeleteConfirmationModal({group}.group)}}>Delete group</a>
                                                                                </div>
                                                                        );
                                                        })
                        setTimeout(()=>{this.activateViewMemberButtons();},300);
                }
                let groupbuttons = null;
                if(this.props.currentUser == null)
                {
                        groupbuttons = <div> Please log in to view your groups </div>
                }
                else
                {
                        groupbuttons = this.props.userGroups.map( (group,i) =>
                                                        {
                                                                let groupid={group}.group+"id";
                                                                groupid=groupid.slice(groupid.lastIndexOf("/")+1);
                                                                return (<a className="item" key={i} onClick={()=>{this.showGroupIDPane(groupid)}}>{groupid.slice(0,groupid.length-2)}</a>);
                                                        }
                                                                );
                }
                let viewmemberspane = this.props.targetGroupMembers.map( (member,i) =>
                                                        {
                                                                return (<UserProfile key={i} userprofilename={member}/>);
                                                        }
                                                                );
                let viewpendingmemberspane = this.props.targetGroupPendingMembers.map( (pendingmember,i) =>
                                                        {
                                                                return (<a className="item" key={i}>{pendingmember}</a>);
                                                        }
                                                                );
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
                let addmemberform = null;
                addmemberform = <form className="ui addmemberform form">
                                        <div className="ui stacked segment">
                                                <div className="field">
                                                        <label>Member names</label>
                                                        <div className="field">
                                                                <select multiple className="inviteusers large ui fluid multiple search selection dropdown" name="newusers">
                                                                </select>
                                                        </div>
                                                        <div className="ui fluid large teal submit button">Add Members</div>
                                                </div>
                                        </div>
                                </form>
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
                return(
                <div>
                        <div style={{display:"inline-block !important", overflow:"hidden"}} className="communitymenu">
                                <div className="massive fluid ui vertical menu viewgrouppane">
                                        <a className="item" onClick={this.showCreateGroupPane}>Create a new group</a>
                                        {groupbuttons}
                                </div>
                        </div>
                        <div style={{display:"inline-block !important", overflow:"hidden"}} className="creategrouppane">
                                {creategroupform}
                        </div>
                        {grouppanes}
                        <div className="addmemberpane transition hidden">
                                {addmemberform}
                        </div>
                        {deleteconfirmation}
                        <div className="viewmemberpane transition hidden">
                                <div className="massive fluid ui vertical menu">
                                        <a className="item">Members</a>
                                        {viewmemberspane}
                                        <a className="item">Pending Members</a>
                                        {viewpendingmemberspane}
                                </div>
                        </div>
                </div>
                );
        }

}

const mapStateToProps = function(state)
{
        return{ breadcrumbValues: state.breadcrumbValues, currentUser: state.currentUser, userGroups: state.userGroups, targetGroup: state.targetGroup, targetGroupMembers: state.targetGroupMembers, targetGroupPendingMembers: state.targetGroupPendingMembers };
}

const mapDispatchToProps = function(dispatch)
{
        return bindActionCreators({ addBreadcrumb: addBreadcrumb, removeBreadcrumb: removeBreadcrumb, updateUserGroups: updateUserGroups, updateTargetGroup:updateTargetGroup, updateTargetGroupMembers: updateTargetGroupMembers, updateTargetGroupPendingMembers: updateTargetGroupPendingMembers }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(GroupPane);
