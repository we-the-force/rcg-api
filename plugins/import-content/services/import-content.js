"use strict";
/** * ImportContent.js service
 * * @description: A set of functions similar to controller's actions to avoid code duplication. */
const { resolveDataFromRequest, getItemsFromData } = require("./utils/utils");
const analyzer = require("./utils/analyzer");
const _ = require("lodash");
const importFields = require("./utils/importFields");
const importArticuloFields = require("./utils/importArticuloFields");
const importMediaFiles = require("./utils/importMediaFiles");
const import_queue = {};
const undo_queue = {};
const categorias_queue = {};
var autores_queue = {};
var tags_queue = {};


const removeImportedFiles = async (fileIds, uploadConfig) => {
    const removePromises = fileIds.map(id =>
        strapi.plugins["upload"].services.upload.remove({ id }, uploadConfig)
    );
    return await Promise.all(removePromises);
};

const undoNextItem = async (importConfig, uploadConfig) => {
    const item = undo_queue[importConfig.id].shift();
    if (!item) {
        console.log("undo complete");
        await strapi
            .query("importconfig", "import-content")
            .update({ id: importConfig.id }, { ongoing: false });
        return;
    }
    try {
        await strapi.query(importConfig.contentType).delete({ id: item.ContentId });
    } catch (e) {
        console.log(e);
    }
    try {
        const importedFileIds = _.compact(item.importedFiles.fileIds);
        await removeImportedFiles(importedFileIds, uploadConfig);
    } catch (e) {
        console.log(e);
    }
    try {
        await strapi.query("importeditem", "import-content").delete({
            id: item.id
        });
    } catch (e) {
        console.log(e);
    }
    const { UNDO_THROTTLE } = strapi.plugins["import-content"].config;
    setTimeout(() => undoNextItem(importConfig, uploadConfig), UNDO_THROTTLE);
};

const importNextItem = async importConfig => {
    const sourceItem = import_queue[importConfig.id].shift();
    const categorias = categorias_queue[importConfig.id];
    const autores = autores_queue[importConfig.id];
    const tags = tags_queue[importConfig.id];
    console.count('-----------source--------------\n',sourceItem);
    if (!sourceItem) {
        console.log("import complete");
        await strapi
            .query("importconfig", "import-content")
            .update({ id: importConfig.id }, { ongoing: false });
        return;
    }
    try {
        console.log('geting item structure');
        let importedItem;
        if(importConfig.contentType === "application::articulo.articulo"){
            importedItem = await importArticuloFields(
                sourceItem,
                importConfig.fieldMapping,
                categorias,
                autores,
                tags
            );
            if(importedItem['autor'] === null){
                importedItem['autor'] = 1;
            }
        }else{
            importedItem = await importFields(
                sourceItem,
                importConfig.fieldMapping
            );
        }
        console.log('imported item',importedItem);
        const savedContent = await strapi
            .query(importConfig.contentType)
            .create(importedItem);
        console.log('content saved', savedContent);
        const uploadedFiles = await importMediaFiles(
            savedContent,
            sourceItem,
            importConfig
        );
        console.log('files uploaded',uploadedFiles);
        const fileIds = _.map(_.flatten(uploadedFiles), "id");
        await strapi.query("importeditem", "import-content").create({
            importconfig: importConfig.id,
            ContentId: savedContent.id,
            ContentType: importConfig.contentType,
            importedFiles: { fileIds }
        });
        console.count('ahoy');
    } catch (e) {
        console.log('error',e);
    }
    console.log('next');
    const { IMPORT_THROTTLE } = strapi.plugins["import-content"].config;
    setTimeout(() => importNextItem(importConfig), IMPORT_THROTTLE);
};

module.exports = {
    preAnalyzeImportFile: async ctx => {
        const { dataType, body, options } = await resolveDataFromRequest(ctx);
        const { sourceType, items } = await getItemsFromData({
            dataType,
            body,
            options
        });
        const analysis = analyzer.analyze(sourceType, items);
        return { sourceType, ...analysis };
    },
    importItems: (importConfig, ctx) =>
        new Promise(async (resolve, reject) => {
            const { dataType, body } = await resolveDataFromRequest(ctx);
            try {
                const { items } = await getItemsFromData({
                    dataType,
                    body,
                    options: importConfig.options
                });

            let categorias = await strapi
                .query('categorias')
                .find({_limit: -1});
            let autores = await strapi
                .query('autor')
                .find({_limit: -1});
            let tags = await strapi
                .query('tag')
                .find({_limit: -1});

            categorias_queue[importConfig.id] = categorias;
            autores_queue[importConfig.id] = autores;
            tags_queue[importConfig.id] = tags;
            import_queue[importConfig.id] = items;
            } catch (error) {
                reject(error);
            }
            resolve({
                status: "import started",
                importConfigId: importConfig.id
            });
            importNextItem(importConfig);
        }),
    undoItems: importConfig =>
        new Promise(async (resolve, reject) => {
            try {
                undo_queue[importConfig.id] = importConfig.importeditems;
            } catch (error) {
                reject(error);
            }
            await strapi
                .query("importconfig", "import-content")
                .update({ id: importConfig.id }, { ongoing: true });
            resolve({
                status: "undo started",
                importConfigId: importConfig.id
            });
            const uploadConfig = await strapi
                .store({
                    environment: strapi.config.environment,
                    type: "plugin",
                    name: "upload"
                })
                .get({ key: "provider" });
            undoNextItem(importConfig, uploadConfig);
        }),
};