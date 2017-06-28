import React from 'react';
import Codemirror from 'react-codemirror';
import PublishModal from './PublishModal.jsx';
import EditMetadataModal from './EditMetadataModal.jsx';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {updateGibletText} from './actions/actions.js';

class TabContent extends React.Component
{
        constructor(props)
        {
                super(props);
                //this.state = { code: this.props.tabs[this.props.tabContentID].text };
                this.updateCode = this.updateCode.bind(this);
        }

        updateCode(newCode)
        {
                this.props.updateGibletText(this.props.tabContentID,newCode);
                //this.forceUpdate();
                //this.setState({code:newCode});
                //this.cmRef.getCodeMirror().refresh();
                //console.log("refreshing codemirror");
                //try{this.cmRef.getCodeMirror().refresh();} catch(err){ console.log("couldn't get codemirror"); }
        }

        componentDidMount()
        {
                this.cmRef.getCodeMirror().refresh();
                let temp_props = this.props;
                let newText = this.props.tabs[this.props.tabContentID].text;
                $('.savebutton')
                        .api({
                            url: window.location.origin+"/update",
                            method: 'POST',
                            beforeSend: function(settings) { console.log(newText);settings.data = { filename: temp_props.tabs[temp_props.tabContentID]._id, newtext: newText }; return settings; },
                            successTest: function(response)
                            {
                              console.log(response);
                              if(response && response.success)
                              {
                                console.log("server responded with successful update!");
                                return response.success;
                              }
                              else
                                return false;
                            },
                            onSuccess: (response) => { console.log("successfully updated file!"); }
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
                $('.savebutton')
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
        }

        render()
        {
                var options = {
                    lineNumbers: true,
                    mode: "text/javascript",
                    inputStyle: "contenteditable",
                    fixedGutter: false
                };
                let savebutton = null;
                let editmetadatabutton = null;
                if(this.props.tabs[this.props.tabContentID].published && this.props.currentUser!=null)
                {
                        savebutton = <div className="ui vertical animated savebutton button" tabIndex="0">
                                        <div className="hidden content">Save</div>
                                        <div className="visible content"><i className="save icon"/></div>
                                </div>;
                        editmetadatabutton = <EditMetadataModal modalId={"em"+this.props.tabContentID}/>;
                }
                else if(this.props.currentUser!=null)
                {
                        savebutton = <PublishModal modalId={"pm"+this.props.tabContentID} code={this.props.tabs[this.props.tabContentID].text}/>;
                        editmetadatabutton = null;
                }
                else
                {
                        savebutton = <div className="ui compact message">Please log in to save or share your giblets.</div>;
                        editmetadatabutton = null;
                }
                return( <div id={"tabcontent"+this.props.tabContentID}>
                                <div className="ui top attached menu">
                                        {savebutton}
                                        {editmetadatabutton}
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
        return bindActionCreators({ updateGibletText:updateGibletText }, dispatch);
}


export default connect(mapStateToProps,mapDispatchToProps)(TabContent);
