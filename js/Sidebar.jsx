import React from 'react';
import GUIClass from './GibberTabs.jsx'


var GibberSidebar = React.createClass({
    componentDidMount() {
        $('.ui.sidebar').sidebar({
            transition: 'push'
        });
    },

    toggleSidebar: function () {
        $('.ui.sidebar').sidebar('toggle');
    },

    render: function () {
                let store = this.props.store;
		return ( 
        	<div id="layout">
        		<div className="ui left vertical menu sidebar">
            		<a className="item">Browse</a>
                	<a className="item">Chat</a>
                	<a className="item">Console</a>
                	<a className="item">Preferences</a>
                	<a className="item">Help</a>
                	<a className="item">Credits</a>
				</div>
            	<div className="pusher">
            		<div className="ui top menu">
                		<a className="item" onClick={this.toggleSidebar}>
                    		<i className="sidebar icon"></i>
                    	</a>
                	</div>
                	<div className="ui segment">
                		{this.props.children}
                        <div className="pusher"><GUIClass store={store}/></div>
                	</div>
            	</div>
        	</div>
		);
    }
});

export default GibberSidebar;
