import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {queuePopup} from './actions/actions.js';

class TitleBar extends React.Component
{
        constructor(props)
        {
                super(props);
                this.state = { active:1 };
                this.toggleSidebar = this.toggleSidebar.bind(this);
        }

        componentDidMount()
        {

        }

        componentDidUpdate()
        {

        }

        toggleSidebar()
        {
                console.log("toggling sidebar");
                $('.ui.sidebar').sidebar('toggle');
        }


        render()
        {
                let titlestyle={position:"fixed",top:"0px"};
                return(
                        <div className="ui top attached main menu">
                                <div><a className="item"><i className="sidebar icon" onClick={this.toggleSidebar}></i></a></div>
                        </div>
                );
        }
}

const mapStateToProps = function(state)
{
        return{ currentUser: state.currentUser, popupQueue: state.popupQueue };
}

const mapDispatchToProps = function(dispatch)
{
        return bindActionCreators({ queuePopup: queuePopup }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(TitleBar);
