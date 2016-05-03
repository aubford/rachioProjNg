app.controller('IndexController', ['$scope', 'getUserInfo', 'durations', 'userInfo',function($scope, getUserInfo, durations, userInfo){

    userInfo.token = 'c3667b81-92a6-4913-b83c-64cc713cbc1e'

    getUserInfo.getId().then(function(results){
        //  console.log(results)
         userInfo.id = results.data.id

         getUserInfo.getUserHardwareInfo(userInfo.id).then(function(results){
           console.log(results);
         })
    })

    $scope.durations  = durations





    $scope.logValue = function(value){
      console.log(value)
      console.log(userInfo.id)
    }

    }])
