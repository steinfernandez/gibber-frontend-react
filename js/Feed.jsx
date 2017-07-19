import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addBreadcrumb} from './actions/actions.js';
import {removeBreadcrumb} from './actions/actions.js';
import {updateCurrentNotifications} from './actions/actions.js';
import {queuePopup} from './actions/actions.js';

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

        }

        componentDidUpdate()
        {
                setTimeout(()=>{
                this.props.currentNotifications.map(
                                                (notification,i) =>
                                                {
                                                        switch(String(notification.type))
                                                        {
                                                                case "GROUP_INVITE":{   var acceptid = "accept"+notification.groupname.slice(notification.groupname.lastIndexOf('/'+1));
                                                                                        var rejectid = "reject"+notification.groupname.slice(notification.groupname.lastIndexOf('/'+1));
                                                                                        $('#'+acceptid)
                                                                                        .api({
                                                                                            url: window.location.origin+"/groupconfirmuser",
                                                                                            method: 'POST',
                                                                                            on: 'click',
                                                                                            beforeSend: (settings) => { settings.data.groupname = notification.groupname; return settings; },
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
                                                                                                                        //console.log(response.response);
                                                                                                                        console.log("group membership confirmed");
                                                                                                                        this.props.queuePopup({header:"Group membership confirmed.",body:"You have been added to "+notification.groupname+"."})
                                                                                                                        //update redux and delete from database
                                                                                                                     }
                                                                                        });
                                                                                        $('#'+rejectid)
                                                                                        .api({
                                                                                            url: window.location.origin+"/grouprejectuser",
                                                                                            method: 'POST',
                                                                                            on: 'click',
                                                                                            beforeSend: (settings) => { settings.data.groupname = notification.groupname; console.log(settings.data); return settings; },
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
                                                                                                                        //console.log(response.response);
                                                                                                                        console.log("notification successfully deleted");
                                                                                                                        //update redux and delete from database
                                                                                                                     }
                                                                                        });
                                                                                        break;}
                                                                case "FRIEND_REQUEST":{ var acceptid = "faccept"+notification.source;
                                                                                        var rejectid = "freject"+notification.source;
                                                                                        $('#'+acceptid)
                                                                                        .api({
                                                                                            url: window.location.origin+"/acceptfriendrequest",
                                                                                            method: 'POST',
                                                                                            on: 'click',
                                                                                            beforeSend: (settings) => { settings.data.username = notification.source; return settings; },
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
                                                                                                                        //console.log(response.response);
                                                                                                                        console.log("successfully accepted friend request");
                                                                                                                        this.props.queuePopup({header:"Friend request accepted.",body:"You are now friends with "+notification.source+"."})
                                                                                                                        //update redux and delete from database
                                                                                                                     }
                                                                                        });
                                                                                        break;}
                                                        }
                                                }
                )},100)
        }

        render()
        {
                if(this.props.currentUser!=null && subscribed==false)
                {
                        //console.log("requesting notifications!");
                        //console.log("http://127.0.0.1/notifications?username="+this.props.currentUser);
                        var es = new EventSource("/notifications?username="+this.props.currentUser);
                        es.onopen = function(e){ console.log("onopen"); console.log(e) };
                        es.onmessage = (e) => { console.log("onmessage"); console.log(e.data); this.props.updateCurrentNotifications(e.data);};
                        es.onerror = function(e){ console.log("onerror"); console.log(e) };
                        subscribed = true;
                }

                /*let notifications = [];
                notifications = this.props.currentNotifications.forEach(function(notification,i)
                                {
                                        console.log(notification);
                                        switch(String(notification.type))
                                        {
                                                case "GROUP_INVITE":    {
                                                                        console.log("case groupinvite triggered");
                                                                        notifications.push(
                                                                                <div className="item">
                                                                                        <a className="user">{notification.source}</a> is a weirdo and wants you to join {notification.groupname}
                                                                                <div className="ui button">Accept</div>
                                                                                </div>
                                                                        );
                                                                        break;}
                                        }
                                });
                console.log(notifications);*/
                console.log(this.props.currentNotifications)
                return(
                        <div className="massive fluid ui vertical menu">
                                {
                                        this.props.currentNotifications.map(
                                                (notification,i) =>
                                                {
                                                        console.log(notification.type);
                                                        switch(String(notification.type))
                                                        {
                                                                case "GROUP_INVITE":    {var acceptid = "accept"+notification.groupname.slice(notification.groupname.lastIndexOf('/'+1));
                                                                                        var rejectid = "reject"+notification.groupname.slice(notification.groupname.lastIndexOf('/'+1));
                                                                                        return(<div className="event" key={i}>
                                                                                                        <div className="content">
                                                                                                                <a className="user">{notification.source}</a> has invited you to join {notification.groupname}
                                                                                                                <div className="ui tiny button" id={acceptid}>Accept</div><div className="ui tiny button" id={rejectid}>Reject</div>
                                                                                                        </div>
                                                                                                </div>);
                                                                                        break;}
                                                                case "FRIEND_REQUEST":  {var acceptid = "faccept"+notification.source;
                                                                                        var rejectid = "freject"+notification.source;
                                                                                        return(<div className="event" key={i}>
                                                                                                        <div className="content">
                                                                                                                <a className="user">{notification.source}</a> would like to be your friend.
                                                                                                                <div className="ui tiny button" id={acceptid}>Accept</div><div className="ui tiny button" id={rejectid}>Reject</div>
                                                                                                        </div>
                                                                                                </div>);
                                                                                        break;}
                                                                case "FR_ACCEPTED":     {return(<div className="event" key={i}>
                                                                                                        <div className="content">
                                                                                                                <a className="user">{notification.source}</a> is now your friend.
                                                                                                        </div>
                                                                                                </div>);
                                                                                        break;}
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
        return bindActionCreators({ addBreadcrumb: addBreadcrumb, removeBreadcrumb: removeBreadcrumb, updateCurrentNotifications: updateCurrentNotifications, queuePopup: queuePopup }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(FeedPane);
