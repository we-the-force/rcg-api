/* 
module.exports = {

  index: async (ctx) => {
    ctx.send({
      message: 'ok'
    });
  }
};
 */
"use strict";
module.exports = {
  preAnalyzeImportFile: async ctx => {
    const services = strapi.plugins["import-content"].services;
    try {
      const data = await services["import-content"].preAnalyzeImportFile(ctx);
      ctx.send(data);
    } catch (error) {
      console.log(error);
      ctx.response.status = 406;
      ctx.response.message = "could not parse: " + error;
    }
  }
};