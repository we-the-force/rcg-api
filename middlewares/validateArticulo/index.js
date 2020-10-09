module.exports = strapi => {
    return {
        initialize() {
            strapi.app.use(async (ctx, next) => {
                if (ctx.method == 'POST' || ctx.method == "PUT")
                {
                    console.log("Soy un url:\r\n", ctx.url);
                    let urlThings = (ctx.url).split("/");
                    console.log("Cosas del url:\r\n", urlThings);
                    if (urlThings.length >= 4)
                    {
                        if (urlThings[1] == "content-manager" && urlThings[3] == "application::articulo.articulo")
                        {
                            let body = JSON.parse(ctx.request.body.data);
                            console.log("Body:\r\n", body);

                            // let lmao = strapi.plugins.upload.services['image-manipulation'].getDimensions();
                            let coverData = await strapi.plugins.upload.services.upload.fetch({id: body.cover});
                            coverData = {
                                width: coverData.width,
                                height: coverData.height
                            };
                            console.log("Strapi.plugins\r\n", coverData);
                            if (coverData.width < 1280 || coverData.height < 720)
                            {
                                return ctx.throw(400, ' AAAAAAAAAAAAAAAAAAAH');
                            }
                            if (body.autor === null)
                            {
                                return ctx.throw(400, ' El autor es nulo');
                            }
                            if (body.categoria === null)
                            {
                                return ctx.throw(400, ' La categoria es nula');
                            }
                            console.log("Pos si jalo chale: ", coverData);
                        }
                        else 
                        {
                            console.log("No era el chavo este chale: ", ctx.url);
                        }
                    }
                    else
                    {
                        console.log("No era length de 5 que rollo: ", urlThings);
                    }
                }
                await next();
            })
        }
    };
};