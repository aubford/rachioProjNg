app.controller('IndexController', ['$scope', '$http', '$window', 'Durations', 'UserInfo', 'GetUserInfo', 'UserCommands', 'socket', '$cookies', function($scope, $http, $window, Durations, UserInfo, GetUserInfo, UserCommands, socket, $cookies) {

    $scope.durations = Durations
    UserInfo.id = $cookies.get('id')
    UserInfo.token = $cookies.get('token')


    GetUserInfo.getUserAndHardwareInfo(UserInfo.id).then(function(hardwareResults) {
        $scope.userName = hardwareResults.data.fullName
        var devices = hardwareResults.data.devices
        var zones = []

        devices.forEach(function(device) {


            socket.emit('joinDeviceRoom', {
                deviceId: device.id
            })
            socket.emit('testRoom', {
                deviceId: device.id
            })

            GetUserInfo.getWebhooks(device.id).then(function(getWebhooksResponse) {
                var webhooks = getWebhooksResponse.data
                var webhookAlreadyInPlace = false

                webhooks.forEach(function(webhook) {

                    if (webhook.externalId === "AubreyApp" + device.id) {
                        webhookAlreadyInPlace = true
                    }
                })

                if (!webhookAlreadyInPlace) {
                    GetUserInfo.setWebHook(device.id).then(function(setWebHookResponse) {})
                }
            })


            device.zones.forEach(function(zone) {

                zones.push({
                    id: zone.id,
                    name: zone.name,
                    deviceName: device.name,
                    deviceId: device.id,
                    status: 'Inactive',
                    statusStyle: "status-text-inactive"
                })
            })

            GetUserInfo.initializeZoneStatus(device.id).then(function(zoneStatusResponse) {

                zones.forEach(function(zone) {

                    var summary
                    var isActive = false
                    var latestEvent = 0


                    for (var i = 0; i < zoneStatusResponse.data.length; i++) {
                        var eventInfo = zoneStatusResponse.data[i]

                        var eventZoneId


                        var eventDatas = eventInfo.eventDatas
                        for (var data in eventDatas) {
                            if (eventDatas[data]["key"] === "zoneId") {
                                eventZoneId = eventDatas[data]["convertedValue"]
                            }
                        }

                        if (eventInfo.type === "ZONE_STATUS" && eventZoneId === zone.id && eventInfo.lastUpdateDate > latestEvent) {

                            latestEvent = eventInfo.lastUpdateDate
                            summary = eventInfo.summary
                            eventInfo.subType === "ZONE_STARTED" ? isActive = true : isActive = false
                        }
                    }

                    if (isActive) {
                        zone.status = summary
                        zone.statusStyle = "status-text-active"
                    } else {
                        zone.status = "Inactive"
                        zone.statusStyle = "status-text-inactive"
                    }

                })
            })
        })

        zones.sort(function(a, b) {
            var keyA = a.name
            var keyB = b.name
            if (keyA < keyB) return -1
            if (keyB < keyA) return 1
            return 0
        })

        UserInfo.zones = zones
        $scope.zones = UserInfo.zones
    })


    socket.on('notification', function(notification) {

        var zoneId = notification.zoneId
        var status = notification.status
        var summary
        var statusStyle

        if (status === "ZONE_STARTED") {
            summary = notification.summary
            var statusStyle = "status-text-active"
        } else {
            summary = "Inactive"
            var statusStyle = "status-text-inactive"
        }

        var zones = UserInfo.zones
        for (var zoneKey in zones) {

            var zone = zones[zoneKey]

            if (zone.id === zoneId) {
                zone.status = summary
                zone.statusStyle = statusStyle
            }
        }
    })

    $scope.runZone = function(zone, duration, index) {
        var durationInSeconds = duration * 60
        $scope.zones[index].status = "Processing..."

        UserCommands.runZone(zone.id, durationInSeconds)
    }

    $scope.logout = function() {
        $window.location.href = "/"
        $cookies.remove("id")
        $cookies.remove("token")
    }


}])


app.controller('LoginController', ['$scope', 'UserInfo', '$window', '$cookies', 'GetUserInfo', function($scope, UserInfo, $window, $cookies, GetUserInfo) {

    $scope.login = function() {
        $scope.validate = false

        GetUserInfo.getId($scope.apiKey).then(function successCallback(userResults) {
            $cookies.put('id', userResults.data.id)
            $cookies.put('token', $scope.apiKey)
            $window.location.href = "#/manual"

        }, function errorCallback(response) {
            $scope.validate = true
        })
    }

}])
