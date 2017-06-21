import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {queuePopup} from './actions/actions.js';
import {dequeuePopup} from './actions/actions.js';
import {dismissPopup} from './actions/actions.js';

class NotificationPopup extends React.Component
{
        constructor(props)
        {
                super(props);
                this.state = { active:1 };
                this.activateMessages = this.activateMessages.bind(this);
        }

        componentDidMount()
        {
                setTimeout(()=>{this.activateMessages();},500);
        }

        componentDidUpdate()
        {
                setTimeout(()=>{this.activateMessages();},500);
                //setTimeout(()=>{this.props.dequeuePopup();},3000);
        }

        activateMessages()
        {
                var delnot = (index)=>{this.props.dismissPopup(index)};
                console.log("activateMessages2");
                for(var i=0;i<this.props.popupQueue.length;i++)
                {
                        $('#popup'+i+' .close').off()
                        .on('click', function(e) {
                        $('#popup'+i).closest('.message').transition('fade');
                        console.log($(this).closest('.message').attr('data'));
                        delnot($(this).closest('.message').attr('data'));
                        })
                }
        }

        render()
        {
                let popups = this.props.popupQueue.map( (popup,i) => {
                        let floatstyle = { position: "absolute", bottom: i*100+"px", right: "10px" };
                        return(<div className="ui floating message" id={"popup"+i} style={floatstyle} key={i} data={i}><i className="close icon"/><div className="header">{popup.header}</div><p>{popup.body}</p></div>);
                })
                console.log(popups);
                return(<div>{popups}</div>);

        }
}

const mapStateToProps = function(state)
{
        return{ currentUser: state.currentUser, popupQueue: state.popupQueue };
}

const mapDispatchToProps = function(dispatch)
{
        return bindActionCreators({ queuePopup: queuePopup, dequeuePopup: dequeuePopup, dismissPopup: dismissPopup }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NotificationPopup);
