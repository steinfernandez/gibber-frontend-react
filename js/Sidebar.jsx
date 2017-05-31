import React from 'react';
import GUIClass from './GibberTabs.jsx';
//import CommunityPane from './CommunityPane.jsx';
import GroupPane from './GroupPane.jsx';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {updateCurrentGiblets} from './actions/actions.js';
import {openGiblet} from './actions/actions.js';
import {addBreadcrumb} from './actions/actions.js';
import {removeBreadcrumb} from './actions/actions.js';
import {updateUserGroups} from './actions/actions.js'


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
        this.showCommunitypane = this.showCommunitypane.bind(this);
        this.showGroupMenuPane = this.showGroupMenuPane.bind(this);

  }

    componentDidMount() {
        $('.ui.sidebar').sidebar({
            transition: 'push',
            dimPage: false,
            closable: false
        });
        //$('.pane').each( function() { $(this).transition('hide'); } );
        $('.browsepane').transition('hide');
        $('.communitypane').transition('hide');
        $('.helppane').transition('hide');
        $('.backbutton').transition('hide');
        $('#browsebutton')
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
        $('#groupbutton')
                .api({
                    url: window.location.origin+"/usercheckinfo",
                    method: 'POST',
                    on: 'click',
                    beforeSend: function(settings) { console.log(settings.data); return settings; },
                    successTest: function(response)
                    {
                      if(response && response.success)
                      {
                        return response.success;
                      }
                      else
                        return false;
                    },
                    onSuccess: (response) => { console.log("onsuccess"); this.props.updateUserGroups(response.response.grouplist);}
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
        this.props.addBreadcrumb("Browse");
        this.forceUpdate();
    }

    showCommunitypane()
    {
        if($('.menupane').transition('is visible'))
        {
                $('.menupane').transition('slide right');
        }
        $('.communitypane').transition('slide left');
        $('.backbutton').transition('slide left');
        this.props.addBreadcrumb("Groups");
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
        this.props.addBreadcrumb("Help");
        this.forceUpdate();
    }

    showMenupane()
    {
        if($('.browsepane').transition('is visible'))
        {
                $('.browsepane').transition('slide left');
        }
        if($('.communitypane').transition('is visible'))
        {
                $('.communitypane').transition('slide left');
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
        $('.communitypane').transition('hide');
        $('.helppane').transition('hide');
        //this.props.removeBreadcrumb(1);
        //this.props.removeBreadcrumb(2);
        this.forceUpdate();
    }

    showGroupMenuPane()
    {
        $('.creategrouppane').transition('hide');
        $('.viewgrouppane').transition('hide');
        $('.friendspane').transition('hide');
        if($('.communitymenu').transition('is visible') == false)
        {
                $('.communitymenu').transition('slide right');
        }
        this.props.removeBreadcrumb(2);
    }

    render() {
                let store = this.props.store;
                let bc1 = <a className="section" onClick={this.showMenupane}>Home</a>;
                let bc2 = null;
                let bc3 = null;
                console.log(this.props.breadcrumbValues);

                if(this.props.breadcrumbValues[1]=="Browse")
                {
                        bc2 =  <span><div className="divider"> / </div><a className="section" onClick={this.showBrowsepane}>Browse</a></span>
                }
                else if(this.props.breadcrumbValues[1]=="Groups")
                {
                        bc2 =  <span><div className="divider"> / </div><a className="section" onClick={this.showCommunityMenuPane}>Groups</a></span>
                }
                else if(this.props.breadcrumbValues[1]=="Help")
                {
                        bc2 =  <span><div className="divider"> / </div><a className="section" onClick={this.showHelppane}>Help</a></span>
                }
                else
                {
                        bc2 = null;
                }

                switch(this.props.breadcrumbValues[2])
                {
                        case "Create Group":    bc3 = <span><div className="divider"> / </div><a className="section">Create Group</a></span>
                                                break;
                        case "View Group":      bc3 = <span><div className="divider"> / </div><a className="section">View Group</a></span>
                                                break;
                        case "Friends":         bc3 = <span><div className="divider"> / </div><a className="section">Friends</a></span>
                                                break;
                        case null :             bc3 = null;
                                                break;
                        default:                bc3 = <span><div className="divider"> / </div><a className="section">{this.props.breadcrumbValues[2]}</a></span>
                                                break;
                }
		return (
        	<div id="layout">
        		<div className="ui left vertical menu sidebar">
                                <div className="ui breadcrumb">
                                        {bc1}{bc2}{bc3}
                                </div>

                                <div className="menupane">
                                        <div className="massive fluid ui vertical menu">
                                                <a className="item" id="browsebutton" onClick={this.showBrowsepane}>Browse</a>
                                                <a className="item" id="groupbutton" onClick={this.showCommunitypane}>Groups</a>
                                                <a className="item" onClick={this.showHelppane}>Help</a>
                                        </div>
                                </div>
                                <div className="browsepane">
                                        {
                                                this.props.currentGiblets.map(
                                                        (giblet,i) =>
                                                        {
                                                                return(<a className="item loadgiblet" key={i} data-filename={giblet._id}>{giblet._id}</a>)
                                                        }
                                                )
                                        }
                                </div>
                                <div className="communitypane">
                                        <GroupPane store={store} />
                                </div>
                                <div className="helppane">
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
        return{ currentGiblets: state.currentGiblets, breadcrumbValues: state.breadcrumbValues };
}

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators({ updateCurrentGiblets: updateCurrentGiblets, openGiblet: openGiblet, addBreadcrumb: addBreadcrumb, removeBreadcrumb: removeBreadcrumb, updateUserGroups: updateUserGroups }, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(GibberSidebar);
