app.controller('IndexController', ['$scope', 'getUserInfo', 'durations', 'userInfo',function($scope, getUserInfo, durations, userInfo){

    userInfo.token = 'c3667b81-92a6-4913-b83c-64cc713cbc1e'
    $scope.durations  = durations
    $scope.zones = [789]

    getUserInfo.getId().then(function(results){
        userInfo.id = results.data.id

        getUserInfo.getUserHardwareInfo(userInfo.id).then(function(results){

          results.data.devices.forEach(function(e){
            var zoneIds = []

          e.zones.forEach(function(z){
             zoneIds.push(z.id)
          })

          userInfo.devices.push({
            deviceId: e.id,
            zones: zoneIds
          })
        })

        // console.log(userInfo.devices[0].zones[0].zid);
        $scope.zones = userInfo.devices[0].zones

      })
})







    $scope.runZone = function(zone,duration){
      console.log(duration)


    }

    }])
