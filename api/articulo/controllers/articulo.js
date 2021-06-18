"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  async find(ctx) {
    let entities;
    // ctx.query = {
    //   ...ctx.query,
    //   _limit: 20,
    // };
    if (ctx.query._q) {
      entities = await strapi.services.restaurant.search(ctx.query);
    } else {
      entities = await strapi.services.restaurant.find(ctx.query);
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.restaurant })
    );
  },

  // async find(ctx) {
  //     let entities;

  //     // What you need to inject
  //     ctx.query = {
  //     ...ctx.query,
  //     _limit: 20,
  // },
};
