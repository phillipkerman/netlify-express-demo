const express = require('express');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');


const router = express.Router();
router.get('/', (req, res) => {
  //res.writeHead(200, { 'Content-Type': 'text/html' });
 // res.write('<h1>is express</h1>');
 // res.send()
   res.sendFile('/chat.html');
 // res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda


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


module.exports = app;
module.exports.handler = serverless(app);
