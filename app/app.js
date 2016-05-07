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

    socket.on('joinDeviceRoom', function(res){
      socket.join(res.deviceId)
    })

    //TODO:Remove
    socket.on('testRoom', function(res){
      io.to(res.deviceId).emit('testRoomRes', {})
    })

  })

  app.post('/', function(req,res){
  

    //TODO:Replace with real info
    var deviceId = "c761bfa0-4c49-4b4f-8a79-04e42bea881a"
    var zoneId = "ad9f83be-8a6c-47ad-af40-8300557c3355"
    var status = "ZONE_STARTED"
    var summary = "Watering Zone 6 for 1 minutes"

    io.to(deviceId).emit('notification', {status:status,zoneId:zoneId, summary:summary})
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
