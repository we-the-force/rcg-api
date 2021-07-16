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

            // console.log(data);

            var message = {
                app_id: "f2f80301-05fa-442c-8ea4-4fcd0dab1abd",
                headings: { "en": "RCG Media" },
                contents: { "en": data.Titulo },
                url: 'https://rcgmedia.mx/articulo/' + data.url + '/',
                small_icon: "https://api.rcgmedia.mx/uploads/logo_rcg_media_250_4df3b2a2e1.png",
                chrome_web_icon: "https://api.rcgmedia.mx/uploads/logo_rcg_media_250_4df3b2a2e1.png",
                included_segments: ["Subscribed Users"]
            };

            if (data.published_at != null) {
                if(data.sendNotification)
                    sendNotification(message);
                //aqui agregar el site map

                // const fs = require("fs");
                // const xml2js = require('xml2js');
                const { create } = require("xmlbuilder2");

                const { readFileSync, writeFileSync } = require("fs");
                const moment = require('moment');

                let sitemapData = readFileSync("/var/www/html/static/sitemap-articulos.xml");
                sitemapData=sitemapData.toString();
                const doc = create(sitemapData);
                const root = doc.root();
                root
                  .ele("url")
                  .ele("loc").txt("https://rcgmedia.mx/articulo/" + data.url + "/").up()
                  .ele("lastmod").txt(moment(data.published_at).format("YYYY-MM-DD")).up()
                  .ele("changefreq").txt("daily").up()
                  .ele("priority").txt("1.0").up()
                  .up();
                sitemapData = doc.end({ prettyPrint: true });
                writeFileSync("/var/www/html/static/sitemap-articulos.xml", sitemapData);

                // let newLine = {
                //     loc: [
                //         'https://rcgmedia.mx/articulo/' + data.url + '/'
                //     ],
                //     lastmod: [moment(data.published_at).format("YYYY-MM-DD")],
                //     changefreq: ['daily'],
                //     priority: ['1.0']
                // }

                // fs.readFile("/var/www/html/static/sitemap-articulos.xml", "utf-8", (err, data) => {
                //     if (err) {
                //         console.log(err);
                //     }
                //     console.log(data);
                //     // convert XML data to JSON object
                //     xml2js.parseString(data, (err, result) => {
                //         if (err) {
                //             console.log(err);
                //         }
                //         console.log(result);
                //         // result.urlset.url.push(newLine);

                //         const builder = new xml2js.Builder();
                //         const xml = builder.buildObject(result);

                //         fs.writeFile('/var/www/html/static/sitemap-articulos.xml', xml, (err) => {
                //             if (err) {
                //                 console.log(err);
                //             }
                //         });

                //         fs.writeFile('/root/web/rcg-app/src/static/sitemap-articulos.xml', xml, (err) => {
                //             if (err) {
                //                 console.log(err);
                //             }
                //         });

                //     });
                // });
            }
        },
    },
};

var sendNotification = function(data) {
    var headers = {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: "Basic MjhjMjdmMjYtMjQ4MS00ODc2LWFkOTAtNTFmZmY4NzVlMWM0",
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
