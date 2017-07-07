import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addBreadcrumb} from './actions/actions.js';
import {removeBreadcrumb} from './actions/actions.js';

class BrowsePane extends React.Component
{
        constructor(props)
        {
                super(props);
                this.state = { active:1 };
                this.showUserBrowsePane = this.showUserBrowsePane.bind(this);
        }

        componentDidMount()
        {
                $('.userbrowsepane').transition('hide');
        }

        showUserBrowsePane()
        {
                if($('.browsemenu').transition('is visible'))
                {
                        $('.browsemenu').transition('hide');
                }
                if(!$('.userbrowsepane').transition('is visible'))
                {
                        $('.userbrowsepane').transition('show');
                        this.props.addBreadcrumb('User');
                }
        }

        render()
        {
                let userbrowsepane = null;

                return(
                        <div>
                                <div className="browsemenu">
                                        <div className="massive fluid ui vertical menu">
                                                <a className="item" onClick={this.showUserBrowsePane}>User</a>
                                                <a className="item">Demos</a>
                                                <a className="item">Tutorials</a>
                                                <a className="item">Search</a>
                                                <a className="item">Recent</a>
                                        </div>
                                </div>
                                <div className="userbrowsepane">
                                        <div className="massive fluid ui vertical menu">
                                        {
                                                this.props.currentGiblets.map(
                                                        (giblet,i) =>
                                                        {
                                                                return(<a className="item loadgiblet" key={i} data-filename={giblet._id}>{giblet._id}</a>)
                                                        }
                                                )
                                        }
                                        </div>
                                </div>
                        </div>
                );
        }
}

const mapStateToProps = function(state)
{
        return{ breadcrumbValues: state.breadcrumbValues, currentUser: state.currentUser, currentGiblets: state.currentGiblets };
}

const mapDispatchToProps = function(dispatch)
{
        return bindActionCreators({ addBreadcrumb: addBreadcrumb, removeBreadcrumb: removeBreadcrumb }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(BrowsePane);
