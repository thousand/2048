define(['sockjs'], function (Sock) {

  var self = {}
    , socketPath = '/Socket2048'
    , CommunicationManager

    , _execute
  ;

  _execute = function (handlers) {
    for ( var i = 0, handler = handlers[i]; i < handlers.length; i++, handler = handlers[i] ) {
      handler.method();
    }
  };

  CommunicationManager = function () {
    var sock = this.socket = new Sock( socketPath );
    this.listeners = {};

    sock.onopen = function () { console.log('[*] open!', sock.protocol) };
    sock.onclose = function () { console.log('[*] closed!') };

    sock.onmessage = this.delegator.bind(this);


  };

  self.delegator = function (e) {
    console.log('[.] ' + e.data);

    var chunk = JSON.parse(e.data);

    _execute( this.listeners[ chunk.messageType ] );

  };

  self.on = function (handle, method) {
    // todo extend to have more options?
    if ( typeof this.listeners[handle] === 'undefined' )
      this.listeners[handle] = [];

    this.listeners[handle].push({ method: method });
  };

  self.send = function (messageType, payload) {
    var message = {
      messageType: messageType,
      data: payload
    }
    this.socket.send( JSON.stringify(message) );
  };

  CommunicationManager.prototype = self;
  return CommunicationManager;

});
