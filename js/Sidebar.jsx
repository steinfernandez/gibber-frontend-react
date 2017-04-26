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
    this.state = { active:1,
                 rerender:false
                };
        this.showBrowsepane = this.showBrowsepane.bind(this);
        this.showMenupane = this.showMenupane.bind(this);
        this.showHelppane = this.showHelppane.bind(this);
        this.showCodepane = this.showCodepane.bind(this);

  }

    componentDidMount() {
        $('.ui.sidebar').sidebar({
            transition: 'push',
            dimPage: false,
            closable: false
        });
        $('.browsepane').transition('hide');
        $('.codepane').transition('hide');
        $('.helppane').transition('hide');
        $('.backbutton').transition('hide');
        $('#refreshfiles')
                .api({
                    url: window.location.origin+"/userreadaccessall",
                    method: 'POST',
                    on: 'click',
                    successTest: function(response)
                    {
                      if(response && response.success)
                      {
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
                      if(response && response.success)
                      {
                        console.log("successfully loaded giblet");
                        return response.success;
                      }
                      else
                        return false;
                    },
                    onSuccess: (response) => { this.props.openGiblet(response.results[0]); }
                     });
    }

    toggleSidebar() {
        $('.ui.sidebar').sidebar('toggle');
    }

    showBrowsepane()
    {
        if($('.menupane').transition('is visible'))
        {
                $('.menupane').transition('slide right');
        }
        $('.browsepane').transition('slide left');
        $('.backbutton').transition('slide left');
        this.forceUpdate();
    }

    showCodepane()
    {
        if($('.menupane').transition('is visible'))
        {
                $('.menupane').transition('slide right');
        }
        $('.codepane').transition('slide left');
        $('.backbutton').transition('slide left');
        this.forceUpdate();
    }

    showHelppane()
    {
        if($('.menupane').transition('is visible'))
        {
                $('.menupane').transition('slide right');
        }
        $('.helppane').transition('slide left');
        $('.backbutton').transition('slide left');
        this.forceUpdate();
    }

    showMenupane()
    {
        if($('.browsepane').transition('is visible'))
        {
                $('.browsepane').transition('slide left');
        }
        if($('.codepane').transition('is visible'))
        {
                $('.codepane').transition('slide left');
        }
        if($('.helppane').transition('is visible'))
        {
                $('.helppane').transition('slide left');
        }
        //$('.backbutton').transition('slide left');
        if($('.menupane').transition('is visible') == false)
        {
                $('.menupane').transition('slide right');
        }
        $('.browsepane').transition('hide');
        $('.codepane').transition('hide');
        $('.helppane').transition('hide');
        this.forceUpdate();
    }

    render() {
                let store = this.props.store;
                let bc1 = <a className="section" onClick={this.showMenupane}>Home</a>;
                let bc2 = null;
                let bc3 = null;

                if($('.browsepane').transition('is visible') == true)
                {
                        bc2 =  <a className="active section">Browse</a>
                }
                else if($('.codepane').transition('is visible') == true)
                {
                        bc2 =  <a className="active section">Code</a>
                }
                else if($('.helppane').transition('is visible') == true)
                {
                        bc2 =  <a className="active section">Help</a>
                }
                else
                {
                        bc2 = null;
                }
		return (
        	<div id="layout">
        		<div className="ui left vertical menu sidebar">
                                <div className="ui breadcrumb">
                                        {bc1}  <div className="divider"> / </div>{bc2}
                                </div>

                                <div className="menupane">
                                        <div className="massive fluid ui vertical menu">
                                                <a className="item" onClick={this.showBrowsepane}>Browse</a>
                                                <a className="item" onClick={this.showCodepane}>Code</a>
                                                <a className="item" onClick={this.showHelppane}>Help</a>
                                        </div>
                                </div>
                                <div className="browsepane">
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
                                <div className="codepane">
                                        code pane goes here
                                </div>
                                <div className="helppane">
                                        help pane goes here
                                </div>
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
