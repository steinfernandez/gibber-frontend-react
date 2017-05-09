import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addBreadcrumb} from './actions/actions.js';
import {removeBreadcrumb} from './actions/actions.js';

class CommunityPane extends React.Component{

        constructor(props) {
                super(props);
                this.state = { active:1 };
        this.showCreateGroupPane = this.showCreateGroupPane.bind(this);
        this.showViewGroupPane = this.showViewGroupPane.bind(this);
        this.showFriendsPane = this.showFriendsPane.bind(this);
  }

        componentDidMount()
        {
                $('.creategrouppane').transition('hide');
                $('.viewgrouppane').transition('hide');
                $('.friendspane').transition('hide');
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
                return(
                <div>
                        <div className="communitymenu">
                                <div className="massive fluid ui vertical menu">
                                        <a className="item" onClick={this.showCreateGroupPane}>Create Group</a>
                                        <a className="item" onClick={this.showViewGroupPane}>View Groups</a>
                                        <a className="item" onClick={this.showFriendsPane}>Friends</a>
                                </div>
                        </div>
                        <div className="creategrouppane">
                                a form to create a group
                        </div>
                        <div className="viewgrouppane">
                                view groups
                        </div>
                        <div className="friendspane">
                                friends and stuff
                        </div>
                </div>
                );
        }

}

const mapStateToProps = function (state) {
        return{ breadcrumbValues: state.breadcrumbValues };
}

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators({ addBreadcrumb: addBreadcrumb, removeBreadcrumb: removeBreadcrumb }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(CommunityPane);
