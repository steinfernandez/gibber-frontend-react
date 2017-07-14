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
                this.state = { active:1 };
                this.showSearchUserPane = this.showSearchUserPane.bind(this);
        }

        componentDidMount()
        {
                $('.searchuserpane').transition('hide');
        }

        showSearchUserPane()
        {
                $('.usermenu').transition('hide');
                $('.searchuserpane').transition('show');
        }

        render()
        {
                return(
                        <div>
                                <div className="usermenu" style={{display:"inline-block !important", overflow:"hidden"}}>
                                        <div className="massive fluid ui vertical menu">
                                                <a className="item" onClick={this.showSearchUserPane}>Search Users</a>
                                                <a className="item">Friends</a>
                                        </div>
                                </div>
                                <div className="searchuserpane">
                                        <form className="ui form">
                                                <div className="field">
                                                        <label>Search User</label>
                                                        <input type="text" name="username"/>
                                                </div>
                                                <button className="ui button" type="submit">Submit</button>
                                        </form>
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
