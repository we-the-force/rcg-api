'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */
const _ = require('lodash');
const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

/*
    Por si se ocupa luego vedah
    async find(ctx, next, { populate } = {}) {
        console.log("Finding lmao");
        // console.log("---");
        // console.log(ctx);

        let prog_sem;
        console.log(strapi.query('programacion-semana'));
        if (_.has(ctx.query, '_q')){
            prog_sem = await strapi.query('programacion-semana').search(ctx.query, populate);
        } else {
            // console.log("- - - Strapi plugins - - -");
            // console.log(strapi.plugins);
            console.log("- - - Strapi services - - -");
            console.log(strapi.plugins['content-manager']);
            // prog_sem = await strapi
        }
    },
    async update()
    {
        console.log("Lmao you thought it was update but it was me! Dio!");
    }
*/

module.exports = {};
