const striptags = require("striptags");
const moment = require('moment'); // require
moment.locale('es');
moment().format(); 

const formatDate = (fecha) => {
    try {
        let newDate = moment.unix(fecha).toDate();
        return newDate;
    } catch (error) {
        return moment().toDate();
    }
}

const formatUrl = (url) => {
    return url.trim().replace(/.*\/([^\/]+)\/$/g,'$1');
}

const importArticuloFields = async (sourceItem, fieldMapping, categs, autors, tags) => {
    const importedItem = {};
    for (const sourceField of Object.keys(fieldMapping)) {
        const { targetField, stripTags } = fieldMapping[sourceField];
        if (!targetField || targetField === "none") {
            return;
        }
        var originalValue = sourceItem[sourceField];
        
        switch (targetField) {
            case "fecha":
                originalValue = await formatDate(originalValue);
                break;

            case "url":
                originalValue = await formatUrl(originalValue);
                break;

            case "categoria":
                let idCateg = null;
                let incomeCateg = originalValue.normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase().split('|');
                await incomeCateg.some(ele => {
                    return categs.some(element2 => {
                        let categoria = element2.nombre.toLowerCase();
                        if(categoria === ele){
                            idCateg = element2.id;
                            return true;
                        }
                    });
                });
                originalValue = idCateg
                break;

            case "autor":
                let idAutor = null;
                let incomeAutor = originalValue.normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase().split('|');
                await incomeAutor.some(ele => {
                    return autors.some(element2 => {
                        let categoria = element2.nombre.toLowerCase();
                        if(categoria === ele){
                            idAutor = element2.id;
                            return true;
                        }
                    });
                }); 
                originalValue = idAutor
                break;
            case "tags":
                let idTag = [];
                let incomeTags = originalValue.normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase().split('|');
                for (const element of incomeTags) {
                    let result = tags.some(el => {
                        let tag = el.nombre.toLowerCase();
                        if(tag === element){
                            idTag.push(el.id);
                            return true
                        }
                    });
                    if(!result && element != ''){
                        let newTag = await strapi.query('tag').create({nombre: element});
                        idTag.push(newTag.id)
                    }
                }
                originalValue = idTag
                break;
        
            default:
                break;
        }

        importedItem[targetField] = stripTags
            ? striptags(originalValue)
            : originalValue;
    }
    return importedItem;
};
module.exports = importArticuloFields;