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

  var bodyParser = require('body-parser')
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))


  io.on('connection', function(socket) {

      socket.on('joinDeviceRoom', function(res) {
          socket.join(res.deviceId)
      })

  })

  app.post('/', function(req, res) {

      var zoneId

      req.body.eventDatas.forEach(function(event){
        if(event.key === "zoneId"){
          console.log(event);
          zoneId = event.convertedValue
        }

      })

      var deviceId = req.body.deviceId
      var status = req.body.subType
      var summary = req.body.summary

      console.log(zoneId)
      console.log(status)
      console.log(summary)

      io.to(deviceId).emit('notification', {
          status: status,
          zoneId: zoneId,
          summary: summary
      })
  })


  app.get('/*', function(req, res, next) {
      var options = {
          root: __dirname + '/public'
      };

      res.sendFile('index.html', options, function(err) {
          if (err) return next(err);
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
