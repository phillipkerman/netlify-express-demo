
/*
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
  socket.on('chat message',(msg)=>{
      console.log( msg )
  })
  socket.on('cursor loc',(loc)=>{
      console.log( loc )
  })
});
*/


function doMyFunction(){

  const WebSocket = require('ws');

  const wss = new WebSocket.Server({ port: 8080 });

  // Broadcast to all.
  wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  };

  wss.on('connection', function connection(ws) {


    ws.on('message', function incoming(data) {
      // Broadcast to everyone else.
      wss.clients.forEach(function each(client) {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(data);
        }
      });
    });
  });

}

function getResult(){
  return "result!"
}
//module.exports = wss;
exports.handler = function(event, context, callback) {
  // your server-side functionality
  //doMyFunction()
  
  callback(null, {
    statusCode: 200,
    type: 'application/json',
    body: "Hello, World",
    data: JSON.stringify( {someObj:"prop"} )
    });
  
}