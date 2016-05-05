app.controller('IndexController', ['$scope', 'Durations', 'UserInfo', 'GetUserInfo', 'UserCommands', function($scope, Durations, UserInfo, GetUserInfo, UserCommands) {

    UserInfo.token = 'c3667b81-92a6-4913-b83c-64cc713cbc1e'
    $scope.durations = Durations

    GetUserInfo.getId().then(function(userResults) {
        UserInfo.id = userResults.data.id

        GetUserInfo.getUserAndHardwareInfo(UserInfo.id).then(function(hardwareResults) {
            $scope.userName = hardwareResults.data.fullName
            var devices = hardwareResults.data.devices
            var zones = []

            devices.forEach(function(device) {

                GetUserInfo.getWebhooks(device.id).then(function(getWebhooksResponse){
                  var webhooks = getWebhooksResponse.data
                  var webhookAlreadyInPlace = false

                  webhooks.forEach(function(webhook){

                    if(webhook.externalId === "AubreyApp"+device.id){
                      webhookAlreadyInPlace = true
                    }
                  })


                  if(!webhookAlreadyInPlace){
                    GetUserInfo.setWebhooks(device.id).then(function(setWebhooksResponse){
                      // UserInfo.webhookId = setWebhooksResponse.id
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




    $scope.runZone = function(zone, duration, index) {
        var durationInSeconds = duration * 60
        $scope.zones[index].status = "Watering for "+duration+" Minutes"
        $scope.zones[index].statusStyle = "status-text-active"

        UserCommands.runZone(zone.id, durationInSeconds).then(function(results) {
            console.log(results);
        })
    }



}])
