app.controller('IndexController', ['$scope', 'getUserInfo', 'durations', 'userInfo',function($scope, getUserInfo, durations, userInfo){

    userInfo.token = 'c3667b81-92a6-4913-b83c-64cc713cbc1e'

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

         })
    })

    $scope.durations  = durations





    $scope.logValue = function(value){
      console.log(value)
      console.log(userInfo.id)
    }

    }])
