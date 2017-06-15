import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addBreadcrumb} from './actions/actions.js';
import {removeBreadcrumb} from './actions/actions.js';
import {updateCurrentNotifications} from './actions/actions.js';

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
                console.log("feed render");
                if(this.props.currentUser!=null && subscribed==false)
                {
                        console.log("requesting notifications!");
                        console.log("http://127.0.0.1/notifications?username="+this.props.currentUser);
                        var es = new EventSource("/notifications?username="+this.props.currentUser);
                        es.onopen = function(e){ console.log("onopen"); console.log(e) };
                        es.onmessage = (e) => { console.log("onmessage"); console.log(e.data); this.props.updateCurrentNotifications(e.data);};
                        es.onerror = function(e){ console.log("onerror"); console.log(e) };
                        subscribed = true;
                }

                let notifications = [];
                notifications = this.props.currentNotifications.forEach(function(notification,i)
                                {
                                        console.log(notification);
                                        switch(String(notification.type))
                                        {
                                                case "GROUP_INVITE":    {
                                                                        console.log("case groupinvite triggered");
                                                                        notifications.push(
                                                                                <div className="event">
                                                                                        <div className="content">
                                                                                                <a className="user">{notification.source}</a> has invited you to join {notification.groupname}
                                                                                        </div>
                                                                                        <div className="ui tiny button">Accept</div>
                                                                                </div>
                                                                        );
                                                                        break;}
                                        }
                                });
                console.log(notifications);
                return(
                        <div className="ui feed">
                                {
                                        this.props.currentNotifications.map(
                                                (notification,i) =>
                                                {
                                                        switch(String(notification.type))
                                                        {
                                                                case "GROUP_INVITE":    return(<div className="event" key={i}>
                                                                                                        <div className="content">
                                                                                                                <a className="user">{notification.source}</a> has invited you to join {notification.groupname}
                                                                                                        </div>
                                                                                                </div>);
                                                                                        break;
                                                        }
                                                }
                                        )
                                }
                        </div>
                );
        }
}

const mapStateToProps = function(state)
{
        return{ currentUser: state.currentUser, breadcrumbValues: state.breadcrumbValues, currentNotifications: state.currentNotifications };
}

const mapDispatchToProps = function(dispatch)
{
        return bindActionCreators({ addBreadcrumb: addBreadcrumb, removeBreadcrumb: removeBreadcrumb, updateCurrentNotifications: updateCurrentNotifications }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(FeedPane);
