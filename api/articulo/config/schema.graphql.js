module.exports = {
    query: `
        articulosCount(where: JSON): Int!
    `,
    resolver: {
        Query: {
            articulosCount: {
                description: 'Return the count of articulos',
                resolverOf: 'application::articulo.articulo.count',
                resolver: async (obj, options, ctx) => {
                    console.log("Resolving articulosCount:");
                    console.log("obj: ", obj);
                    console.log("options: ", options.where);
                    console.log("context: ", ctx);
                    return await strapi.api.articulo.services.articulo.count(options.where || {});
                },
            },
        },
    },
};