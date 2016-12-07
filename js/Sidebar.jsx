import React from 'react';
import GUIClass from './GibberTabs.jsx'


var request = require('request');


var GibberSidebar = React.createClass({
    componentDidMount() {
        $('.ui.sidebar').sidebar({
            transition: 'push'
        });
    },

    toggleSidebar: function () {
        $('.ui.sidebar').sidebar('toggle');
    },

   signIn: function() {
        request.post({url:'http://127.0.0.1:8081/login',jar:true,form:{username:"user1", password:"user1user1"}}, function (error, response, body) {
	if (!error && response.statusCode == 200) {
	console.log(body);
	//console.log(response);
	}
	else
	{
		console.log(error);
		//console.log(response);
	}
})
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
                	<div className="ui segment">
                        <GUIClass sidebarToggler={this.toggleSidebar} store={store}/></div>
            	</div>
        	</div>
		);
    }
});

export default GibberSidebar;
