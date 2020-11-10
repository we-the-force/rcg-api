'use strict';

/**
 * Cron config that gives you an opportunity
 * to run scheduled jobs.
 *
 * The cron format consists of:
 * [SECOND (optional)] [MINUTE] [HOUR] [DAY OF MONTH] [MONTH OF YEAR] [DAY OF WEEK]
 *
 * See more details here: https://strapi.io/documentation/v3.x/concepts/configurations.html#cron-tasks
 */

module.exports = {
    /**
     * Simple example.
     * Every monday at 1am.
     */
    // '0,10,20,30,40,50 * * * * *': async () => {
    /* '0 0 0 * * *': async() => {
        console.log();
        console.log("Ayy el cron");
        const currentDate = new Date();
        // console.log(strapi.api.articulo.services);
        const initialFeaturedArticles = await strapi.api.articulo.services.articulo.find({
            relevante: true
        });

        var featuredArticles = [];
        initialFeaturedArticles.forEach((article) => {
            console.log(`Fecha del article '${article.id}': '${article.fin_relevante}'`);
            if (article.fin_relevante != null) {
                let newDate = new Date(article.fin_relevante);
                // console.log(`La wea fecha: (${article.fin_relevante}) [ ${newDate}, ${currentDate} ]`, );
                if (newDate < currentDate) {
                    // console.log("Es menor a huevo");
                    featuredArticles.push(article);
                }
            } else {
                featuredArticles.push(article);
                console.log("Fecha null unu");
            }

        })

        console.log(featuredArticles.length); */

    /* featuredArticles.forEach(async (article) => {
      await strapi.api.articulo.services.articulo.update({id: article.id}, {relevante: false});
    }) */
}
};