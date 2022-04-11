'use strict';

const connectToDatabase = require('../config/db')

module.exports.healthCheck = async () => {
  await connectToDatabase()
  console.log('Conexion satisfactoria')
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Conexion satisfactoria' })
  }
}

module.exports.getAll = async () => {
	try {
		const routes = {
			"peliculas": process.env.HOST + "dev/api/peliculas/",
			"personas": process.env.HOST + "dev/api/personas/",
			"planetas": process.env.HOST + "dev/api/planetas/",
			"especies": process.env.HOST + "dev/api/especies/",
			"naves": process.env.HOST + "dev/api/naves/",
			"vehiculos": process.env.HOST + "dev/api/vehiculos/"
		}
		return {
			statusCode: 200,
			body: JSON.stringify(routes)
		}
	} catch (err) {
		return {
			statusCode: err.statusCode || 500,
			headers: { 'Content-Type': 'text/plain' },
			body: 'Could not fetch the notes.'
		}
	}
}