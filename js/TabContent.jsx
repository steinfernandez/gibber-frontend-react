import React from 'react';
import Codemirror from 'react-codemirror';
import PublishModal from './PublishModal.jsx';
import EditMetadataModal from './EditMetadataModal.jsx';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class TabContent extends React.Component{

  constructor(props) {
    super(props);
    this.state = { code: this.props.tabs[this.props.tabContentID].tabContent };
    this.updateCode = this.updateCode.bind(this);
  }

    updateCode(newCode) {
        this.setState({
            code: newCode
        });
    }

    componentDidMount() {
        this.cmRef.getCodeMirror().refresh();
        let temp_props = this.props;
        let newText = this.state.code;
        $('.save.button')
                .api({
                    url: window.location.origin+"/update",
                    method: 'POST',
                    beforeSend: function(settings) { console.log(newText);settings.data = { filename: temp_props.tabs[temp_props.tabContentID].tabName, newtext: newText }; return settings; },
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

    componentDidUpdate() {
        this.cmRef.getCodeMirror().refresh();
        let temp_props = this.props;
        let newText = this.state.code;
        $('.save.button')
                .api({
                    url: window.location.origin+"/update",
                    method: 'POST',
                    beforeSend: function(settings) { settings.data = { filename: temp_props.tabs[temp_props.tabContentID].tabName, newtext: newText }; return settings; },
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

    render() {
        var options = {
            lineNumbers: true,
            mode: "text/javascript",
            inputStyle: "contenteditable",
            fixedGutter: false
        };
        let savebutton = null;
        let editmetadatabutton = <EditMetadataModal modalId={"em"+this.props.tabContentID}/>;
        if(this.props.tabs[this.props.tabContentID].published && this.props.currentUser!=null)
                savebutton = <div className="ui vertical animated save button" tabIndex="0">
                                <div className="hidden content">Save</div>
                                <div className="visible content"><i className="save icon"/></div>
                        </div>;
        else if(this.props.currentUser!=null)
                savebutton = <PublishModal modalId={"pm"+this.props.tabContentID} code={this.state.code}/>;
        else
                savebutton = <div className="ui compact message">Please log in to save or share your giblets.</div>;
        return( <div>
                        <div className="ui top attached menu">
                                {savebutton}
                                {editmetadatabutton}
                        </div>
                        <Codemirror value={this.state.code} onChange={this.updateCode} options={options} ref={(Codemirror) => { this.cmRef = Codemirror; }}/>
                </div>
              );
    }
};

const mapStateToProps = function (state) {
        return{ tabs: state.tabs, currentUser: state.currentUser };
}


export default connect(mapStateToProps)(TabContent);
