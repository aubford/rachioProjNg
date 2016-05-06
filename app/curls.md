Add a webhook

curl -X POST -H "Content-Type: application/json" -H "Authorization: Bearer c3667b81-92a6-4913-b83c-64cc713cbc1e" -d '{"device":{"id":"c761bfa0-4c49-4b4f-8a79-04e42bea881a"}, "externalId" : "external company ID", "url":"http://e406f4c3.ngrok.io","eventTypes":[{"id":"5"},{"id":"10"}]}' https://api.rach.io/1/public/notification/webhook



Get all webhooks of a device

curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer c3667b81-92a6-4913-b83c-64cc713cbc1e" https://api.rach.io/1/public/notification/c761bfa0-4c49-4b4f-8a79-04e42bea881a/webhook





GET CURRENT SCHEDULE

curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer c3667b81-92a6-4913-b83c-64cc713cbc1e" https://api.rach.io/1/public/device/c761bfa0-4c49-4b4f-8a79-04e42bea881a/current_schedule



GET DEVICE EVENTS

curl -X GET -H "Content-Type: application/json" -H "Authorization: Bearer c3667b81-92a6-4913-b83c-64cc713cbc1e" https://api.rach.io/1/public/device/c761bfa0-4c49-4b4f-8a79-04e42bea881a/event?startTime=1462434458531&endTime=1462437774584



TURN ON DEVICE

curl -X PUT -H "Content-Type: application/json" -H "Authorization: Bearer c3667b81-92a6-4913-b83c-64cc713cbc1e" -d '{ "id" : "c761bfa0-4c49-4b4f-8a79-04e42bea881a" }' https://api.rach.io/1/public/device/on



Delete a webhook

 curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer c3667b81-92a6-4913-b83c-64cc713cbc1e" https://api.rach.io/1/public/notification/webhook/--WEBHOOKID--

  curl -X DELETE -H "Content-Type: application/json" -H "Authorization: Bearer c3667b81-92a6-4913-b83c-64cc713cbc1e" https://api.rach.io/1/public/notification/webhook/c0e9fb6c-2955-40e0-8c7d-db35ccd473c4
