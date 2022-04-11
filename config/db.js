const Sequelize = require('sequelize')
const PersonaModel = require('../models/persona')
const PeliculaModel = require('../models/pelicula')
const NaveModel = require('../models/nave')
const EspecieModel = require('../models/especie')
const PlanetaModel = require('../models/planeta')
const VehiculoModel = require('../models/vehiculo')

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        dialect: 'mysql',
        dialectOptions: {
            encrypt: true,
            ssl: {
                rejectUnauthorized: false
            }
        },
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    }
)

const Persona = PersonaModel(sequelize, Sequelize)
const Pelicula = PeliculaModel(sequelize, Sequelize)
const Nave = NaveModel(sequelize, Sequelize)
const Especie = EspecieModel(sequelize, Sequelize)
const Planeta = PlanetaModel(sequelize, Sequelize)
const Vehiculo = VehiculoModel(sequelize, Sequelize)
const Models = { Persona, Pelicula, Nave, Especie, Planeta, Vehiculo }
const connection = {}

module.exports = async () => {
    if (connection.isConnected) {
        console.log('=> Usar conexion existente')
        return Models
    }

    await sequelize.sync()
    await sequelize.authenticate()
    connection.isConnected = true
    console.log('=> Creando una nueva conexion')
    return Models
}