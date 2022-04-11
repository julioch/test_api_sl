module.exports = (sequelize, type) => {
    return sequelize.define('planeta', {
        nombre: type.STRING,
        diametro: type.STRING,
        periodo_rotacion: type.STRING,
        periodo_orbita: type.STRING,
        gravedad: type.STRING,
        poblacion: type.STRING,
        ambiente: type.STRING,
        terreno: type.STRING,
        superficie_agua: type.STRING,
        residentes: type.JSON,
        peliculas: type.JSON,
        url: type.STRING
    })
}