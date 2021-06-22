"use strict";
/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    lifecycles: {
        beforeCreate(data) {},
        afterCreate(result) {},
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

                const fs = require("fs");
                const xml2js = require('xml2js');
                const moment = require('moment');

                let newLine = {
                    loc: [
                        'https://rcgmedia.mx/articulo/' + data.url + '/'
                    ],
                    lastmod: [moment(data.published_at).format("YYYY-MM-DD")],
                    changefreq: ['daily'],
                    priority: ['1.0']
                }

                fs.readFile("/var/www/html/static/sitemap-articulos.xml", "utf-8", (err, data) => {
                    if (err) {
                        console.log(err);
                    }

                    // convert XML data to JSON object
                    xml2js.parseString(data, (err, result) => {
                        if (err) {
                            console.log(err);
                        }

                        result.urlset.url.push(newLine);

                        const builder = new xml2js.Builder();
                        const xml = builder.buildObject(result);

                        fs.writeFile('/var/www/html/static/sitemap-articulos.xml', xml, (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });

                    });
                });
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