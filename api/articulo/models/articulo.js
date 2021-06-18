"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    lifecycles: {
        beforeCreate(data) {},
        afterCreate(result) {
            var message = {
                app_id: "2b8f51fa-8098-49d8-a9a5-a36441f41907",
                contents: { "en": "English Message" },
                included_segments: ["Subscribed Users"]
            };

            if (result.published_at != null) {
                sendNotification(message);
                //aqui agregar el site map
            }
        },
        beforeUpdate(data) {},
        afterUpdate(data) {
            var message = {
                app_id: "2b8f51fa-8098-49d8-a9a5-a36441f41907",
                contents: { "en": "English Message" },
                included_segments: ["Subscribed Users"]
            };

            if (data.published_at != null) {
                sendNotification(message);
                //aqui agregar el site map
            }
        },
    },
};

var sendNotification = function(data) {
    var headers = {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": "Basic ODA1YTMyM2ItNzljMC00NGU0LTgxOTItZjk0NGFkYTA4NTdj"
    };

    var options = {
        host: "onesignal.com",
        port: 443,
        path: "/api/v1/notifications",
        method: "POST",
        headers: headers
    };

    var https = require('https');
    var req = https.request(options, function(res) {
        res.on('data', function(data) {
            console.log("Response:");
            console.log(JSON.parse(data));
        });
    });

    req.on('error', function(e) {
        console.log("ERROR:");
        console.log(e);
    });

    req.write(JSON.stringify(data));
    req.end();
};