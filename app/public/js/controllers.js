app.controller('IndexController', ['$scope', 'getUserInfo', 'durations', 'userId', function($scope, getUserInfo, durations, userId){

     getUserInfo.getId('c3667b81-92a6-4913-b83c-64cc713cbc1e').then(function(results){
         console.log(results)
         userId.id = results.data.id
     })

     $scope.durations  = durations



















    $scope.logValue = function(value){
      console.log(value)
      console.log(userId.id)
    }

    }])
