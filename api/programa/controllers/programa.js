'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
    async find(ctx) {
        let entities;
        ctx.query = {
        ...ctx.query,
        _limit: -1,
        };
        if (ctx.query._q) {
        entities = await strapi.services.programa.search(ctx.query);
        } else {
        entities = await strapi.services.programa.find(ctx.query);
        }

        return entities.map((entity) =>
        sanitizeEntity(entity, { model: strapi.models.programa })
        );
    },
};
