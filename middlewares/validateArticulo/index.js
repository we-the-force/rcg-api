module.exports = strapi => {
    return {
        initialize() {
            strapi.app.use(async (ctx, next) => {
                if (ctx.method == 'POST' || ctx.method == "PUT")
                {
                    let urlThings = (ctx.url).split("/");
                    if (urlThings.length > 2)
                    {
                        if (urlThings[3] == "application::articulo.articulo")
                        {
                            let body = JSON.parse(ctx.request.body.data);
                            // console.log(body);

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
                        }
                    }
                }
                await next();
            })
        }
    };
};