module.exports = (sequelize, type) => {
    return sequelize.define('especie', {
        nombre: type.STRING,
        clasificacion: type.STRING,
        designacion: type.STRING,
        altura_media: type.STRING,
        esperanza_vida_media: type.STRING,
        color_ojos: type.STRING,
        color_cabellos: type.STRING,
        color_piel: type.STRING,
        lenguaje: type.STRING,
        mundo_natal: type.STRING,
        personas: type.JSON,
        peliculas: type.JSON,
        url: type.STRING
    })
}