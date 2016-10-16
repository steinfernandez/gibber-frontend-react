import React from 'react';

class TabContent extends React.Component{

  constructor(props) {
    super(props);
    this.state = { active:1,tabnames:["First","Second","Third","+"] ,tabarray:["content1","content2","content3","content4"] };
  }

  render(){

        let textstyle = {
                height: "90vh",
                width: "88vw",
                border: "1px solid",
                overflow: "auto"
        };

        let buttonstyle = {
                position: "absolute",
                top: "15",
                right: "22"
        };
        
        return( <div contentEditable="true" style={textstyle}>this is a new tab default text<input id="button" style={buttonstyle} type="button" value="X"/></div> );  
}

}

export default TabContent;
