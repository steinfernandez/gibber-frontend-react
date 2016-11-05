import React from 'react';


var GibberSidebar = React.createClass({
    componentDidMount() {
        $('.ui.sidebar').sidebar({
            transition: 'overlay'
        });
    },

    toggleSidebar: function () {
        $('.ui.sidebar').sidebar('toggle');
    },

    render: function () {
		return ( 
        	<div id="layout">
        		<div className="ui inverted left vertical sidebar menu">
            		<a className="item">Item 1</a>
                	<a className="item">Item 2</a>
                	<a className="item">Item 3</a>
				</div>
            	<div className="pusher">
            		<div className="ui top fixed menu">
                		<a className="item" onClick={this.toggleSidebar}>
                    		<i className="sidebar icon"></i>
                    	</a>
                	</div>
                	<div className="ui segment">
                		{this.props.children}
                	</div>
            	</div>
        	</div>
		);
    }
});

export default GibberSidebar;
