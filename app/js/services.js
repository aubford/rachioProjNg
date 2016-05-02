app.factory('factest', ['$http',function($http){
  return function(){
    $http.get('http://www.omdbapi.com/?i=tt0076759')
  }
}])
