app.directive('templateT', function(){
  return {
    scope: {
      workingy: '='
    },
    controller: ['$scope', function($scope){
      console.log('Directive Controller ' + $scope.workingy)
    }],
    templateUrl: '../partials/template.html',
    transclude: true
    }
})

app.directive('link', function(){
  return {
    link: function(scope, element, attrs) {
      element.on('click', function(){
        console.log('Link ' + scope.workingy)
      })
    }
  }
})
