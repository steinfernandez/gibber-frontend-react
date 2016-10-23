import React from 'react';
import Codemirror from 'react-codemirror';

class TabContent extends React.Component{

  constructor(props) {
    super(props);
    this.state = { code: "// Code" };
    this.updateCode = this.updateCode.bind(this);
  }

    updateCode(newCode) {
        this.setState({
            code: newCode
        });
    }

    render() {
        var options = {
            lineNumbers: true,
            mode: "javascript"
        };
        return <Codemirror value={this.state.code} onChange={this.updateCode} options={options} />
    }
};


export default TabContent;
