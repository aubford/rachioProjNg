app.factory('GetUserInfo', ['$http', 'UserInfo', function($http, UserInfo) {

    var WEBHOOK_URL = "http://b9192af7.ngrok.io"

    return {
        getId: function() {
            return $http.get('https://api.rach.io/1/public/person/info', {
                headers: {
                    'Authorization': 'Bearer ' + UserInfo.token
                }
            })
        },
        getUserAndHardwareInfo: function(userId) {
            return $http.get('https://api.rach.io/1/public/person/' + userId, {
                headers: {
                    'Authorization': 'Bearer ' + UserInfo.token
                }
            })
        },
        getWebhooks: function(deviceId) {
            return $http.get('https://api.rach.io/1/public/notification/' + deviceId + '/webhook', {
                headers: {
                    'Authorization': 'Bearer ' + UserInfo.token
                }
            })
        },
        setWebHook: function(deviceId) {
            return $http.post('https://api.rach.io/1/public/notification/webhook', {
                device: {
                    id: deviceId
                },
                externalId: "AubreyApp" + deviceId,
                url: WEBHOOK_URL,
                eventTypes: [{
                    id: "10"
                }]
            }, {
                headers: {
                    'Authorization': 'Bearer ' + UserInfo.token
                }
            })
        },
        initializeZoneStatus: function(deviceId) {
            var now = Number(new Date())
            var hourAgo = Number(new Date()) - (3600000 * 4) //TODO:Change this to 12 hours

            return $http.get("https://api.rach.io/1/public/device/" + deviceId + "/event?startTime=" + hourAgo + "&endTime=" + now, {
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

app.factory('socket', ["$rootScope", function($rootScope) {
    var socket = io.connect();
    return {
        on: function(eventName, callback) {
            socket.on(eventName, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    callback.apply(socket, args);
                });
            });
        },
        emit: function(eventName, data, callback) {
            socket.emit(eventName, data, function() {
                var args = arguments;
                $rootScope.$apply(function() {
                    if (callback) {
                        callback.apply(socket, args);
                    }
                });
            })
        }
    }
}])






app.value('UserInfo', {
    id: '',
    token: '',
    zones: []
})

app.value('Durations', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 120, 180])
