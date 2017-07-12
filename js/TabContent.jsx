import React from 'react';
import Codemirror from 'react-codemirror';
import PublishModal from './PublishModal.jsx';
import EditMetadataModal from './EditMetadataModal.jsx';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {updateGibletText} from './actions/actions.js';
import {updateGibletFileData} from './actions/actions.js';
import 'codemirror/mode/javascript/javascript.js'

class TabContent extends React.Component
{
        constructor(props)
        {
                super(props);
                this.updateCode = this.updateCode.bind(this);
                this.sizeCM = this.sizeCM.bind(this);
        }

        updateCode(newCode)
        {
                this.props.updateGibletText(this.props.tabContentID,newCode);
        }

        sizeCM()
        {
                try
                {
                        $('.ReactCodeMirror').css({"height":"74vh"});
                        $('.CodeMirror').each((i,e)=>{e.CodeMirror.setSize("100%","100%")});
                        //setTimeout(()=>{$('.CodeMirror').each((i,e)=>{e.CodeMirror.setSize("100%","100%")});},100);
                }
                catch(err)
                {
                        console.log(err);
                }
        }

        componentDidMount()
        {
                this.sizeCM();
                let temp_props = this.props;
                let newText = this.props.tabs[this.props.tabContentID].text;
                $('#tabcontent'+this.props.tabContentID+' .savebutton')
                .api({
                    url: window.location.origin+"/update",
                    method: 'POST',
                    beforeSend: function(settings) { settings.data = { filename: temp_props.tabs[temp_props.tabContentID]._id, newtext: newText }; console.log(settings.data); return settings; },
                    successTest: function(response)
                    {
                      if(response && response.success)
                      {
                        return response.success;
                      }
                      else
                        return false;
                    },
                    onSuccess: (response) => { console.log("successfully updated file!"); }
                     });
                //heartbutton
                $('#tabcontent'+this.props.tabContentID+' .heartbutton')
                .api({
                    on: 'click',
                    url: window.location.origin+"/likefile",
                    method: 'POST',
                    beforeSend: function(settings) { settings.data = { filename: temp_props.tabs[temp_props.tabContentID]._id }; console.log(settings.data); return settings; },
                    successTest: function(response)
                    {
                      if(response && response.success)
                      {
                        return response.success;
                      }
                      else
                        return false;
                    },
                    onSuccess: (response) =>
                                {
                                        console.log("successfully liked file!");
                                        this.props.updateGibletFileData(this.props.tabContentID,response.filedata);
                                        setTimeout(()=>{console.log(this.props.tabs[this.props.tabContentID]);},2000);
                                }
                     });
        }

        componentWillMount()
        {
                this.updateCode(this.props.tabs[this.props.tabContentID].text);
        }

        componentDidUpdate()
        {
                let temp_props = this.props;
                let newText = this.props.tabs[this.props.tabContentID].text;
                $('#tabcontent'+this.props.tabContentID+' .savebutton')
                .api({
                    url: window.location.origin+"/update",
                    method: 'POST',
                    beforeSend: function(settings) { settings.data = { filename: temp_props.tabs[temp_props.tabContentID]._id, newtext: newText }; console.log(settings.data); return settings; },
                    successTest: function(response)
                    {
                      if(response && response.success)
                      {
                        return response.success;
                      }
                      else
                        return false;
                    },
                    onSuccess: (response) => { console.log("successfully updated file!"); }
                     });
                $('#tabcontent'+this.props.tabContentID+' .heartbutton')
                .api({
                    on: 'click',
                    url: window.location.origin+"/likefile",
                    method: 'POST',
                    beforeSend: function(settings) { settings.data = { filename: temp_props.tabs[temp_props.tabContentID]._id }; console.log(settings.data); return settings; },
                    successTest: function(response)
                    {
                      if(response && response.success)
                      {
                        return response.success;
                      }
                      else
                        return false;
                    },
                    onSuccess: (response) =>
                                {
                                        console.log("successfully liked file!");
                                        console.log(this.props.tabContentID);
                                        this.props.updateGibletFileData(this.props.tabContentID,response.filedata);
                                        console.log(this.props.tabs);
                                }
                     });
        }

        render()
        {
                var options = {
                    lineNumbers: true,
                    mode: "javascript",
                    inputStyle: "contenteditable",
                    fixedGutter: false
                };
                let savebutton = null;
                let editmetadatabutton = null;
                let heartbutton = null;
                let _heartbutton = <button className="ui basic button mini heartbutton">
                    <i className="icon empty heart" /> Like
                </button>
                let _unheartbutton = <button className="ui basic button mini unheartbutton"><i className="icon heart"/>Unlike</button>
                if(this.props.tabs[this.props.tabContentID].published && this.props.currentUser!=null)
                {
                        savebutton = <button className="ui basic button mini" onClick={this.activateModal} tabIndex="0">
                                  <i className="save icon" />Save
                                </button>
                        editmetadatabutton = <EditMetadataModal modalId={"em"+this.props.tabContentID}/>;
                        if(this.props.tabs[this.props.tabContentID].likedby!=undefined)
                        {
                                console.log(this.props.tabs[this.props.tabContentID].likedby);
                                if(this.props.tabs[this.props.tabContentID].likedby.indexOf(this.props.currentUser)==-1)
                                {
                                        heartbutton = _heartbutton;
                                }
                                else
                                {
                                        heartbutton = _unheartbutton;
                                }
                        }
                        else
                        {
                                heartbutton = _heartbutton;
                        }
                }
                else if(this.props.currentUser!=null)
                {
                        savebutton = <PublishModal modalId={"pm"+this.props.tabContentID} code={this.props.tabs[this.props.tabContentID].text}/>;
                        editmetadatabutton = null;
                }
                else
                {
                        savebutton = <div className="ui compact mini message">Please log in to save your giblets.</div>;
                        editmetadatabutton = null;
                }
                var likes = null;
                if(this.props.tabs[this.props.tabContentID].likes != undefined)
                {
                        if(this.props.tabs[this.props.tabContentID].likes>0)
                        {
                                likes = <div>{this.props.tabs[this.props.tabContentID].likes}</div>
                        }
                }
                return( <div id={"tabcontent"+this.props.tabContentID} className="cmdiv">
                                <div className="ui top attached menu">
                                        {savebutton}
                                        {editmetadatabutton}
                                        {heartbutton}{likes}
                                </div>
                                <Codemirror id={"codemirror"+this.props.tabContentID} value={this.props.tabs[this.props.tabContentID].text} onChange={this.updateCode} options={options} ref={(Codemirror) => { this.cmRef = Codemirror; }}/>
                        </div>
                      );
        }
};

const mapStateToProps = function(state)
{
        return{ tabs: state.tabs, currentUser: state.currentUser };
}

const mapDispatchToProps = function(dispatch)
{
        return bindActionCreators({ updateGibletText:updateGibletText, updateGibletFileData:updateGibletFileData }, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(TabContent);
