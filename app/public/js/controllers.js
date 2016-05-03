app.controller('IndexController', ['$scope', 'factest', function($scope, factest){

    $scope.durations = [1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,120,180,240,300,360,420,480,540,600]

    $scope.logvalue = function(value){
      console.log(value)
    }

    }])
