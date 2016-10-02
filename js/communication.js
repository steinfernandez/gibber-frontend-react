import  { EventEmitter }  from 'events'

let Communication = new EventEmitter

Object.assign( Communication, {
  socket : null,
  initialized: false,

  init() {
    this.socket = new WebSocket( this.getServerAddress() )
    this.socket.onmessage = this.onmessage.bind( this )

    this.initialized = true
  },

  getServerAddress() {
    let expr, socketIPAndPort, socketString, ip, port

    expr = /[-a-zA-Z0-9.]+(:(6553[0-5]|655[0-2]\d|65[0-4]\d{2}|6[0-4]\d{3}|[1-5]\d{4}|[1-9]\d{0,3}))/

    socketIPAndPort = expr.exec( window.location.toString() )[ 0 ].split( ':' )
    ip = socketIPAndPort[ 0 ]
    port = parseInt( socketIPAndPort[ 1 ] )

    socketString = `ws://${ip}:${port}`

    return socketString
  },

  onmessage( e ) {
    let data = JSON.parse( e.data )

    this.emit( data.type, e.data )
  },

  beginMonitoringClient( client ) {
    let msg = { key:'monitor.start', data:client.id }
    this.socket.send( JSON.stringify( msg ) )
  },

  endMonitoringClient( client ) {
    let msg = { key:'monitor.end', data:client.id }
    this.socket.send( JSON.stringify( msg ) )
  }

})

export default Communication
