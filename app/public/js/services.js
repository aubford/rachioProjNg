app.factory('GetUserInfo', ['$http', 'UserInfo', function($http, UserInfo) {
    return {
        getId: function() {
            return $http.get('https://api.rach.io/1/public/person/info', {
                headers: {
                    'Authorization': 'Bearer ' + UserInfo.token
                }
            })
        },
        getUserAndHardwareInfo: function(id) {
            return $http.get('https://api.rach.io/1/public/person/' + id, {
                headers: {
                    'Authorization': 'Bearer ' + UserInfo.token
                }
            })
        },
        getWebhooks: function(deviceId){
            return $http.get('https://api.rach.io/1/public/notification/'+ deviceId +'/webhook', {
                headers: {
                    'Authorization': 'Bearer ' + UserInfo.token
                }
            })
        },
        setWebhooks: function(deviceId) {
            return $http.post('https://api.rach.io/1/public/notification/webhook', {
                device: {
                    id: deviceId
                },
                externalId: "AubreyApp" + deviceId,
                url: "http://278d4f66.ngrok.io",
                eventTypes: [{
                    id: "5"
                }, {
                    id: "10"
                }]
            }, {
                headers: {
                    'Authorization': 'Bearer ' + UserInfo.token
                }
            })
        }
    }
}])






app.factory('UserCommands', ['$http', 'UserInfo', function($http, UserInfo) {
    return {
        runZone: function(zoneId, duration) {
            return $http.put('https://api.rach.io/1/public/zone/start', {
                id: zoneId,
                duration: duration
            }, {
                headers: {
                    'Authorization': 'Bearer ' + UserInfo.token
                }
            })
        }



    }
}])



    app.value('UserInfo', {
        id: '',
        token: '',
        zones: [],
        webhookId: ''
    })

app.value('Durations', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 120, 180])
