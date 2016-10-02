import React from 'react'

import {
  Icon,
  Checkbox,
  Button,
  Table, Tr, Td
} from 'semantic-react'


let MessageRow = React.createClass({
  render: function() { 
    return (

      <Tr>
        <Td collapsing >{this.props.clientID}</Td>
        <Td collapsing >{this.props.address}</Td>
        <Td >{this.props.value}</Td>
      </Tr>

    )
  }
})

let signalsKey = 0

let SignalsTable = React.createClass({
  getInitialState: function() {
    return { 
      msgs:[],
    }
  },
  getDefaultProps : function() {
    return {
      height: '300px',
    }
  },
  addMessage( msg ) {
    let msgs = this.state.msgs.slice( -14,13 )
    msgs.unshift( msg )
    this.setState({ msgs })
  },
  removeAllMessages() { this.setState({ msgs:[] }) },

  render: function() { 
    return (

      <Table unstackable="true" inverted compact columns="3">
        <thead>
          <Tr>
            <th colSpan={3} style={{ backgroundColor:'#300' }}>
              Signal Monitor
              <Button inverted="true" floated="right" size="tiny" basic="true" style={{ float:'right' }} onClick={this.removeAllMessages}>clear</Button>
            </th>
          </Tr>
          <Tr>
            <th>client id#</th><th>address</th><th colSpan={2}>value</th>
          </Tr>
        </thead>

        {/*<tbody style={{ display:'block', overflow:'scroll', height:this.props.height }}>*/}
          <tbody>
          {
            this.state.msgs.map( msg => <MessageRow clientID={msg.id} address={msg.address} value={msg.value} key={signalsKey++} /> )
          }
        </tbody>
      </Table>

    )
  }
})

export { SignalsTable }
