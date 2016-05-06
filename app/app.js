  var express = require('express');
  var logger = require('morgan');
  var app = express();
  app.use(logger('dev'));
  app.use(express.static('public'));
  var http = require('http')
  var port = normalizePort(process.env.PORT || '3000')
  app.set('port', port)
  var server = http.createServer(app)
  server.listen(port)
  var io = require('socket.io')(server)


  io.on('connection', function(socket){
    console.log("connection");

    socket.on('joinDeviceRoom', function(res){
      socket.join(res.deviceId)
    })

    //TODO:Remove
    socket.on('testRoom', function(res){
      io.to(res.deviceId).emit('testRoomRes', {})
    })

  })



  app.post('/', function(req,res){
    console.log("incoming notification",req.body);
    //TODO: Check the to() input is the device ID
    io.to(req.body.device.id).emit('notification', {})

  })


  app.get('/*', function(req, res, next){
   var options = {root: __dirname + '/public'};

   res.sendFile('index.html', options, function(err){
     if(err) return next(err);
   })
  });

  function normalizePort(val) {
    var port = parseInt(val, 10)

    if (isNaN(port)) {
      return val
    }
    if (port >= 0) {
      return port
    }
    return false
  }
