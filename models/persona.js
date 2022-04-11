module.exports = (sequelize, type) => {
    return sequelize.define('persona', {
        nombre: type.STRING,
        nacimiento: type.STRING,
        color_ojo: type.STRING,
        genero: type.STRING,
        color_cabello: type.STRING,
        altura: type.STRING,
        peso: type.STRING,
        color_piel: type.STRING,
        mundo_natal: type.STRING,
        peliculas: type.JSON,
        especies: type.JSON,
        vehiculos: type.JSON,
        naves: type.JSON,
        url: type.STRING
    })
}