import React from 'react';
import Codemirror from 'react-codemirror';
import '../node_modules/codemirror/mode/javascript/javascript';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class TabContent extends React.Component{

  constructor(props) {
    super(props);
    console.log(this.props.tabs);
    console.log(this.props.tabContentID);
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
    }

    componentDidUpdate() {
        this.cmRef.getCodeMirror().refresh();
    }

    render() {
        var options = {
            lineNumbers: true,
            mode: "text/javascript",
            inputStyle: "contenteditable",
            fixedGutter: false
        };
        return( <div>
                        <div className="ui top attached menu">
                                <div className="ui vertical animated button" tabIndex="0">
                                        <div className="hidden content">Save</div>
                                        <div className="visible content"><i className="save icon"></i></div>
                                </div>
                        </div>
                        <Codemirror value={this.state.code} onChange={this.updateCode} options={options} ref={(Codemirror) => { this.cmRef = Codemirror; }}/>
                </div>
              );
    }
};

const mapStateToProps = function (state) {
        return{ tabs: state.tabs };
}


export default connect(mapStateToProps)(TabContent);
