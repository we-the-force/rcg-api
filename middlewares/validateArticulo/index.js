module.exports = strapi => {
    return {
        initialize() {
            strapi.app.use(async (ctx, next) => {
                if (ctx.method == 'POST' || ctx.method == "PUT")
                {
                    console.log("\r\nSoy un url:\r\n", ctx.url);
                    let urlThings = (ctx.url).split("/");
                    console.log("Cosas del url:\r\n", urlThings);
                    if (urlThings.length >= 4)
                    {
                        if (urlThings[1] == "content-manager" && urlThings[3] == "application::articulo.articulo")
                        {
                            let result = {
                                valid: true,
                                errorMessage: "",
                                errors: 0
                            }

                            let body = JSON.parse(ctx.request.body.data);
                            console.log("Body:");
                            console.log(body);
                            console.log(body.cover);

                            if (body.cover === undefined || body.cover === null)
                            {
                                result.valid = false;
                                result.errors++;
                                result.errorMessage += "Tener cover es obligatorio";
                            }
                            else
                            {
                                // let lmao = strapi.plugins.upload.services['image-manipulation'].getDimensions();
                                let coverData = await strapi.plugins.upload.services.upload.fetch({id: body.cover});
                                coverData = {
                                    width: coverData.width,
                                    height: coverData.height
                                };
                                console.log("coverData: ", coverData);

                                if (coverData.width < 1280 || coverData.height < 720)
                                {
                                    result.valid = false;
                                    result.errors++;
                                    result.errorMessage += `La resolucion de la imagen no cumple los requisitos minimos (tiene [${coverData.width}x${coverData.height}] y se requiere [1280x720])`; 
                                    // result.errorMessage = result.errors > 0 ? "" : ""; 
                                }
                            }
                            if (body.autor === undefined || body.autor === null)
                            {
                                result.valid = false;
                                result.errors++;
                                result.errorMessage += result.errors > 0 ? ", el articulo debe tener un autor relacionado" : "El articulo debe tener un autor relacionado"; 
                            }
                            if (body.categoria === undefined || body.categoria === null)
                            {
                                result.valid = false;
                                result.errors++;
                                result.errorMessage += result.errors > 0 ? ", el articulo debe tener una categoria relacionada" : "El articulo debe tener una categoria relacionada"; 
                            }

                            if (!result.valid)
                            {
                                console.log(`Ocurrio un error publicando el articulo: \r\n${result.errorMessage}`);
                                // alert(`Ocurrio un error publicando el articulo: \r\n${result.errorMessage}`);
                                return ctx.throw(400, `Error: ${result.errorMessage}`);
                            }
                            return ctx.throw(400, 'Caiese');
                        }
                    }
                    else
                    {
                        console.log("Ah chale, no era la wea esta y asi\r\n", ctx.url);
                    }
                }
                await next();
            })
        }
    };
};