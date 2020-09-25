'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

 const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
    async create(ctx) {
        let entity;
        if (ctx.is('multipart')) {
            const {data, files} = parseMultipartData(ctx);
            entity = await strapi.services.calca.create(data, {files});
        }
        else
        {
            entity = await strapi.services.calca.create(ctx.request.body);
        }

        let entry = sanitizeEntity(entity, {model: strapi.models.calca});

        console.log("Adding calca:\r\n", entry);

        strapi.plugins['email'].services.email.send({
            to: "erfamel@gmail.com",
            from: "about@wetheforce.com",
            subject: "Se ha dado de alta una calca",
            text: "Se ha dado de alta una calca",
            html: `<h2>Alguien ha dado de alta una calca</h2>
            <br>
            <p><b>Nombre:</b> ${entry.nombre}</p>
            <p><b>Direccion:</b> ${entry.direccion}</p>
            <p><b>Ciudad:</b> ${entry.ciudad}</p>
            <p><b>Telefono:</b> ${entry.telefono}</p>
            <p><b>Calca:</b> ${entry.numero_calca}</p>`
        })

        return entry;
    }
};