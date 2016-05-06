app.controller('IndexController', ['$scope', '$http','Durations', 'UserInfo', 'GetUserInfo', 'UserCommands', 'socket', function($scope, $http, Durations, UserInfo, GetUserInfo, UserCommands, socket) {

    UserInfo.token = 'c3667b81-92a6-4913-b83c-64cc713cbc1e'
    $scope.durations = Durations

    GetUserInfo.getId().then(function(userResults) {
        UserInfo.id = userResults.data.id

        GetUserInfo.getUserAndHardwareInfo(UserInfo.id).then(function(hardwareResults) {
            $scope.userName = hardwareResults.data.fullName
            var devices = hardwareResults.data.devices
            var zones = []

            devices.forEach(function(device) {
                  console.log(device);

                socket.emit('joinDeviceRoom', {deviceId: device.id})
                socket.emit('testRoom', {deviceId:device.id})

                GetUserInfo.getWebhooks(device.id).then(function(getWebhooksResponse){
                  var webhooks = getWebhooksResponse.data
                  var webhookAlreadyInPlace = false

                  webhooks.forEach(function(webhook){

                    // console.log(webhook);

                    if(webhook.externalId === "AubreyApp"+device.id){
                      webhookAlreadyInPlace = true
                    }

                    // /////////////DELETE ALL WEBHOOKS  TODO:Remove
                    // $http.delete('https://api.rach.io/1/public/notification/webhook/'+ webhook.id, {
                    //     headers: {
                    //         'Authorization': 'Bearer ' + UserInfo.token
                    //     }
                    // })
                    // //////////////

                  })

                  // console.log(webhookAlreadyInPlace);

                  if(!webhookAlreadyInPlace){

                    GetUserInfo.setWebHook(device.id).then(function(setWebHookResponse){
                      // UserInfo.webhookId = setWebHookResponse.id
                    })
                  }
                })


                device.zones.forEach(function(zone) {

                    zones.push({
                        id: zone.id,
                        name: zone.name,
                        deviceName: device.name,
                        deviceId: device.id,
                        status: 'Inactive',
                        statusStyle: "status-text-inactive"

                    })
                })

                GetUserInfo.initializeZoneStatus(device.id).then(function(zoneStatusResponse){
                  // console.log(zoneStatusResponse);
                  zones.forEach(function(zone){
                    // TODO: Loop and determine statuses and display them.
                  })
                })

            })

            zones.sort(function(a,b){
              var keyA = a.name
              var keyB = b.name
              if(keyA < keyB) return -1
              if(keyB < keyA) return 1
              return 0
            })

            UserInfo.zones = zones
            $scope.zones = UserInfo.zones
        })
    })

    //TODO: Remove
    socket.on('testRoomRes', function(res){
      console.log("TESTROOMRESOK");
    })


    socket.on('notification', function(notification){
      console.log("notification received in controller");
      //TODO: Activate/Deactivate corresponding card.
    })


    $scope.runZone = function(zone, duration, index) {
        var durationInSeconds = duration * 60
        $scope.zones[index].status = "Watering for "+duration+" Minutes"
        $scope.zones[index].statusStyle = "status-text-active"

        UserCommands.runZone(zone.id, durationInSeconds).then(function(results) {})
    }



}])
