import React from 'react';

class TabContent extends React.Component{

  constructor(props) {
    super(props);
    this.state = { active:1,tabnames:["First","Second","Third","+"] ,tabarray:["content1","content2","content3","content4"] };
  }

  render(){

        let textstyle = {
                height: "90vh",
                width: "75vw"
        };
        
        return( <input type="text" style={textstyle}></input> );  
}

}

export default TabContent;
