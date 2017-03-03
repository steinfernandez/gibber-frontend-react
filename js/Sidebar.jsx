import React from 'react';
import GUIClass from './GibberTabs.jsx'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {updateCurrentGiblets} from './actions/actions.js';
import {openGiblet} from './actions/actions.js';


var request = require('request');


class GibberSidebar extends React.Component{

  constructor(props) {
    super(props);
    this.state = { active:1};
  }

    componentDidMount() {
        $('.ui.sidebar').sidebar({
            transition: 'push',
            dimPage: false,
            closable: false
        });
        $('#refreshfiles')
                .api({
                    url: window.location.origin+"/userreadaccessall",
                    method: 'POST',
                    on: 'click',
                    successTest: function(response)
                    {
                      console.log(response);
                      if(response && response.success)
                      {
                        console.log("successfully retrieved filelist");
                        return response.success;
                      }
                      else
                        return false;
                    },
                    onSuccess: (response) => { this.props.updateCurrentGiblets(response.results); this.InitializeGibletLoaders();}
                     });
    }

    InitializeGibletLoaders() 
    {
        $('.loadgiblet')
                .api({
                    url: window.location.origin+"/userreadaccessfile",
                    method: 'POST',
                    on: 'click',
                    beforeSend: function(settings) { settings.data = { filename: $(this).attr('data-filename') }; return settings; },
                    successTest: function(response)
                    {
                      console.log(response);
                      if(response && response.success)
                      {
                        console.log("successfully loaded giblet");
                        return response.success;
                      }
                      else
                        return false;
                    },
                    onSuccess: (response) => { console.log("calling open giblet"); this.props.openGiblet(response.results[0]._id, response.results[0].text); }
                     });
    }

    toggleSidebar() {
        $('.ui.sidebar').sidebar('toggle');
    }

    render() {
                let store = this.props.store;
		return ( 
        	<div id="layout">
        		<div className="ui left vertical menu sidebar">
                        <a className="item" key={9999} id="refreshfiles">Click here to show/refresh files</a>
                        {
                                this.props.currentGiblets.map(
                                        (giblet,i) => 
                                        {
                                                return(<a className="item loadgiblet" key={i} data-filename={giblet._id}>{giblet._id}</a>)    
                                        }
                                )
                        }
				</div>
            	<div className="pusher">
                	<div className="ui segment">
                        <GUIClass sidebarToggler={this.toggleSidebar} store={store}/></div>
            	</div>
        	</div>
		);
    }
}

const mapStateToProps = function (state) {
        return{ currentGiblets: state.currentGiblets };
}

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators({ updateCurrentGiblets: updateCurrentGiblets, openGiblet: openGiblet }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(GibberSidebar);
