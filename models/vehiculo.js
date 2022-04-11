module.exports = (sequelize, type) => {
    return sequelize.define('vehiculo', {
        nombre: type.STRING,
        modelo: type.STRING,
        clase_vehiculo: type.STRING,
        manufactura: type.STRING,
        costo_en_creditos: type.STRING,
        longitud: type.STRING,
        tripulacion: type.STRING,
        pasajeros: type.STRING,
        velocidad_max_atmosfera: type.STRING,
        capacidad_carga: type.STRING,
        consumibles: type.STRING,
        peliculas: type.JSON,
        pilotos: type.JSON,
        url: type.STRING
    })
}