'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    lifecycles: {
        afterCreate(result) {
            console.log("add to site map");
        },
        afterUpdate(data) {
            console.log("add to site map");
        },
    },
};
