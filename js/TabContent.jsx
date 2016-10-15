import React from 'react';

class TabContent extends React.Component{

  constructor(props) {
    super(props);
    this.state = { active:1,tabnames:["First","Second","Third","+"] ,tabarray:["content1","content2","content3","content4"] };
  }

  render(){

        let textstyle = {
                height: "90vh",
                width: "85vw",
                border: "1px solid"
        };
        
        return( <div contentEditable="true" style={textstyle}>this is a new tab default text</div> );  
}

}

export default TabContent;
