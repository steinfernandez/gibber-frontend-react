import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addBreadcrumb} from './actions/actions.js';
import {removeBreadcrumb} from './actions/actions.js';
import {updateUserGroups} from './actions/actions.js';
import {updateTargetGroup} from './actions/actions.js';

class GroupPane extends React.Component{

        constructor(props)
        {
                super(props);
                this.state = { active:1 };
                /*this.showCreateGroupPane = this.showCreateGroupPane.bind(this);
                this.showViewGroupPane = this.showViewGroupPane.bind(this);
                this.showFriendsPane = this.showFriendsPane.bind(this);
                this.activateCreateGroupForm = this.activateCreateGroupForm.bind(this);
                this.activateViewGroupList = this.activateViewGroupList.bind(this);
                this.activateGroupInfoButton = this.activateGroupInfoButton.bind(this);
                this.showDeleteConfirmationModal = this.showDeleteConfirmationModal.bind(this);
                this.hideDeleteConfirmationModal = this.hideDeleteConfirmationModal.bind(this);*/
        }

        componentDidMount()
        {
                /*this.props.updateUserGroups(["group1","group2","group3"]);*/
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

        render()
        {
                let groupbuttons = null;
                if(this.props.currentUser == null)
                {
                        groupbuttons = <div> Please log in to view your groups </div>
                }
                else
                {
                        console.log(this.props.userGroups);
                        groupbuttons = this.props.userGroups.map( (group,i) => { return (<a className="item" key={i}>{group}</a>); } );
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
                                        <a className="item">Create a new group</a>
                                        {groupbuttons}
                                </div>
                        </div>
                        <div className="creategrouppane">
                                {creategroupform}
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

export default connect(mapStateToProps,mapDispatchToProps)(GroupPane);
