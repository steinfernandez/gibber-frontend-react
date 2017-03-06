import React from 'react';
import Codemirror from 'react-codemirror';
import '../node_modules/codemirror/mode/javascript/javascript';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

class TabContent extends React.Component{

  constructor(props) {
    super(props);
    this.state = { code: this.props.tabContent[this.props.tabContentID]+'' };
    this.updateCode = this.updateCode.bind(this);
  }

    updateCode(newCode) {
        this.setState({
            code: newCode
        });
    }

    LogCode() {
        console.log(this.props.tabContent[this.props.tabContentID]);
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
        return <Codemirror onClick={this.LogCode()} value={this.state.code} onChange={this.updateCode} options={options} ref={(Codemirror) => { this.cmRef = Codemirror; }}/>
    }
};

const mapStateToProps = function (state) {
        return{ tabContent: state.tabContent };
}


export default connect(mapStateToProps)(TabContent);
