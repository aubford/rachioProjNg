app.factory('getUserInfo', ['$http','userId',function($http, userId){
  return {
    getId: function(token){
      return $http.get('https://api.rach.io/1/public/person/info', {headers: {'Authorization' : 'Bearer ' + token}
    })

    }
  }
}])

app.value('userId', {id: 'wrong'})
app.value('durations', [1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,120,180,240,300,360,420,480,540,600])
