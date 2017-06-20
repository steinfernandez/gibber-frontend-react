import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {queuePopup} from './actions/actions.js';
import {dequeuePopup} from './actions/actions.js';

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
                console.log("activating close button");
                $('.message .close').off()
                  .on('click', (e) => {
                    this.props.dequeuePopup();
                    $(this)
                      .closest('.message')
                      .transition('fade')
                    ;
                    //e.stopImmediatePropagation();
                  })
                ;
        }

        render()
        {
                let popups = this.props.popupQueue.map( (popup,i) => {
                        return(<div className="ui floating message" key={i}><i className="close icon"/><div className="header">{popup.header}</div><p>{popup.body}</p></div>);
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
        return bindActionCreators({ queuePopup: queuePopup, dequeuePopup: dequeuePopup }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NotificationPopup);
