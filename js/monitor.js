let Monitor = {
  GUI: null,
  Communication: null,

  init( GUI, Communication ) {
    this.GUI = GUI
    this.Communication = Communication

    this.Communication.init()

    this.GUI.clientsTable.eventEmitter.on( 'beginClientMonitoring', client => Communication.beginMonitoringClient( client ) )
    this.GUI.clientsTable.eventEmitter.on( 'endClientMonitoring',   client => Communication.endMonitoringClient( client ) )

    this.registerEvents()
  },

  registerEvents() {
    this.Communication.on( 'newClient', e => {
      let event = JSON.parse( e )
      this.GUI.clientsTable.addClient( event )
    })

    this.Communication.on( 'monitoring', msgData => {
      let msg = JSON.parse( msgData )
      msg.data.value = msg.data.parameters.length > 1 ?  msg.data.parameters.toString() : msg.data.parameters[0]
      Monitor.GUI.signalsTable.addMessage( msg.data )
    })

    this.Communication.on( 'removeClient', msgData => {
      let msg = JSON.parse( msgData )
      Monitor.GUI.clientsTable.removeClientWithID( msg.id )
    })
  },
}

export default Monitor
