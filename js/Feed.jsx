import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addBreadcrumb} from './actions/actions.js';
import {removeBreadcrumb} from './actions/actions.js';

class FeedPane extends React.Component
{
        constructor(props)
        {
                super(props);
                this.state = { active:1 };
        }

        componentDidMount()
        {
                /*this.props.updateUserGroups(["group1","group2","group3"]);*/
                /*$('.viewgrouppane').transition('hide');*/
        }

        render()
        {

                return(
                        <div className="ui feed">
                                <div className="event">
                                        <div className="label"><img src="/images/avatar/small/elliot.jpg"/></div>
                                        <div className="content">
                                                <div className="summary">
                                                        <a className="user">Elliot Fu</a> added you as a friend
                                                        <div className="date">1 Hour Ago</div>
                                                </div>
                                                <div className="meta"><a className="like"><i className="like icon"></i> 4 Likes</a></div>
                                        </div>
                                </div>
                        </div>
                );
        }

}

const mapStateToProps = function(state)
{
        return{ breadcrumbValues: state.breadcrumbValues };
}

const mapDispatchToProps = function(dispatch)
{
        return bindActionCreators({ addBreadcrumb: addBreadcrumb, removeBreadcrumb: removeBreadcrumb }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(FeedPane);
