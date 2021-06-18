'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
    lifecycles: {
        afterCreate(result) {
            if(result.Radio_TV){
                console.log("add to site map radio");
            }else{
                console.log("add to site map tv");
            }
        },
        afterUpdate(data) {
            if(data.Radio_TV){
                console.log("add to site map radio");
            }else{
                console.log("add to site map tv");
            }
        },
    },
};
