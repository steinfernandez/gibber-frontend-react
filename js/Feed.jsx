import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addBreadcrumb} from './actions/actions.js';
import {removeBreadcrumb} from './actions/actions.js';

var subscribed = false;

class FeedPane extends React.Component
{
        constructor(props)
        {
                super(props);
                this.state = { active:1 };
        }

        componentDidMount()
        {
                /*
                var evtSource = new EventSource('sse.php');
                console.log(evtSource.withCredentials);
                console.log(evtSource.readyState);
                console.log(evtSource.url);
                evtSource.onopen = function()
                {
                        console.log("Connection to server opened.");
                };
                evtSource.onmessage = function(e)
                {
                        console.log(e);
                }
                evtSource.onerror = function()
                {
                        console.log("EventSource failed.");
                };*/
        }

        render()
        {
                if(this.props.currentUser!=null && subscribed==false)
                {
                        console.log("requesting notifications!");
                        function demo(e)
                        {
                                console.log(e);
                        }
                        console.log("/notifications?username="+this.props.currentUser);
                        var quelle = new EventSource("/notifications?username="+this.props.currentUser);
                        quelle.onmessage = demo;
                        subscribed = true;
                }

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
        return{ currentUser: state.currentUser, breadcrumbValues: state.breadcrumbValues };
}

const mapDispatchToProps = function(dispatch)
{
        return bindActionCreators({ addBreadcrumb: addBreadcrumb, removeBreadcrumb: removeBreadcrumb }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(FeedPane);
