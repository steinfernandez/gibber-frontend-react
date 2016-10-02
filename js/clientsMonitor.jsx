import React from 'react'
import { EventEmitter } from 'events'

import {
  Icon,
  Checkbox,
  Label,
  Table, Tr, Td
} from 'semantic-react'


let ClientRow = React.createClass({
  getInitialState: function() {
    return { checked:false }
  },
  handleCheckBox: function() {
    let newState = !this.state.checked
    this.setState({ checked:newState })
  },
  render: function() { 
    return (

      <Tr>
        <Td>{this.props.id}</Td>
        <Td>{this.props.ip}</Td>
        <Td>{this.props.interfaceName}</Td>
        <Td aligned="center">
          <Checkbox checked={this.state.checked} onClick={ this.props.monitorHandler.bind( null, this ) } />
        </Td>
      </Tr>

    )
  }
})

let uid = 0

let ClientsTable = React.createClass({
  getInitialState: function() {
    return { 
      clients:[],
    }
  },

  getDefaultProps : function() {
    return {
      height: '100px',
    }
  },

  addClient( client ) {
    let clients = this.state.clients.slice( 0 )

    client.key = uid++
    clients.push( client )
    this.setState({ clients })
  },

  removeClientWithID( id ) {
    let clients = this.state.clients.slice( 0 ),
        idx = clients.findIndex( client => client.id === id )

    clients.splice( idx, 1 )
    this.setState({ clients })
  },
  
  monitorClient( row ) {
    let newState = !row.state.checked,
        ip = row.props.ip

    row.setState({ checked:newState })

    if( newState ) {
      this.eventEmitter.emit( 'beginClientMonitoring', row.props )      
    }else{
      this.eventEmitter.emit( 'endClientMonitoring', row.props )
    }

  },

  componentDidMount() {
    this.eventEmitter = new EventEmitter() 
  },

  render: function() { 
    return (

      <Table unstackable="true" inverted columns="4">
        <thead>
          <Tr>
            <th colSpan={4} style={{ backgroundColor:'#300' }}>Connected Clients</th>
          </Tr>
          <Tr>
            <th>client id#</th><th>ip address</th><th>interface name</th><th>monitoring</th>
          </Tr>
        </thead>

        {/*<tbody style={{ display:'block', overflow:'scroll', height:this.props.height }}>*/}
        <tbody>
          {
            this.state.clients.map( ( client, i ) => { 
              let row = <ClientRow id={client.id} ip={client.ip} interfaceName={client.interfaceName} key={client.key} monitorHandler={ this.monitorClient } parent={this} /> 
              return row
            })
          }
        </tbody>
      </Table>

    )
  }
})

export { ClientsTable, ClientRow }
