import React from 'react'

import { ClientsTable }  from './clientsMonitor.jsx'
import { SignalsTable }  from './SignalMonitor.jsx'

let GUIClass = React.createClass({
  render: function() { 
    return (
      <div>
        <ClientsTable ref={ (ref) => this.clientsTable = ref } />
        <SignalsTable ref={ (ref) => this.signalsTable = ref } />
      </div>
    )
  }
})

export default GUIClass
