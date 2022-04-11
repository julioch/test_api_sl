module.exports = (sequelize, type) => {
    return sequelize.define('nave', {
        nombre: type.STRING,
        modelo: type.STRING,
        clase_nave: type.STRING,
        manufactura: type.STRING,
        costo_en_creditos: type.STRING,
        longitud: type.STRING,
        tripulacion: type.STRING,
        pasajeros: type.STRING,
        velocidad_max_atmosfera: type.STRING,
        rango_hiperimpulsor: type.STRING,
        mglt: type.STRING,
        capacidad_carga: type.STRING,
        consumibles: type.STRING,
        peliculas: type.JSON,
        pilotos: type.JSON,
        url: type.STRING
    })
}
