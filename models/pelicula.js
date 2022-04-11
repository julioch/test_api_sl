module.exports = (sequelize, type) => {
    return sequelize.define('pelicula', {
        titulo: type.STRING,
        id_episodio: type.INTEGER,
        intro_apertura: type.TEXT,
        director: type.STRING,
        productor: type.STRING,
        fecha_realizacion: type.DATEONLY,
        personajes: type.JSON,
        especies: type.JSON,
        vehiculos: type.JSON,
        planetas: type.JSON,
        naves: type.JSON,
        url: type.STRING
    })
}