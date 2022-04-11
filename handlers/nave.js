'use strict';

const connectToDatabase = require('../config/db')
const { Op } = require("sequelize");

const getPagination = (page, size) => {
	const limit = size ? +size : 3;
	const offset = page ? page * limit : 0;

	return { limit, offset };
};

const getPagingData = (data, page, limit, url) => {
	const { count: count, rows: results } = data;
	const currentPage = page ? +page : 0;
	const next = url + 'dev/api/naves/?page=' + (currentPage + 1)
	const previous = currentPage == 0 ? null : url  + 'dev/api/naves/?page=' + (currentPage - 1);

	return { count, next, previous, results };
}; 

function HTTPError (statusCode, message) {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}

module.exports.create = async (event) => {
	try {
		if (!JSON.parse(event.body).nombre) {
			return {
				statusCode: 400,
				body: JSON.stringify({
					message: "El nombre no puede estar vacio!"
				})
			}
		}
		const { Nave } = await connectToDatabase()
		const nave = await Nave.create(JSON.parse(event.body))
		return {
			statusCode: 200,
			body: JSON.stringify(nave)
		}
	} catch (err) {
		return {
			statusCode: err.statusCode || 500,
			headers: { 'Content-Type': 'text/plain' },
			body: 'No se pudo crear el registro.'
		}
	}
}

module.exports.getOne = async (event) => {
	try {
		const { Nave } = await connectToDatabase()
		const nave = await Nave.findByPk(event.pathParameters.id)
		if (!nave) throw new HTTPError(404, `El registro con id: ${event.pathParameters.id} no fue encontrado`)
		return {
			statusCode: 200,
			body: JSON.stringify(nave)
		}
	} catch (err) {
		return {
			statusCode: err.statusCode || 500,
			headers: { 'Content-Type': 'text/plain' },
			body: err.message || 'No se pudo encontrar el registro.'
		}
	}
}

module.exports.getAll = async (event) => {
	try {
        const { page, size, nombre } = event.queryStringParameters == null ? {} : event.queryStringParameters;
        let condition = nombre ? { nombre: { [Op.like]: `%${nombre}%` } } : null;

	    const { limit, offset } = getPagination(page, size);

		const { Nave } = await connectToDatabase()
		const naves = await Nave.findAndCountAll({ where: condition, limit, offset })
		const url = process.env.HOST;
		const response = getPagingData(naves, page, limit, url);
		return {
			statusCode: 200,
			body: JSON.stringify(response)
		}
	} catch (err) {
		return {
			statusCode: err.statusCode || 500,
			headers: { 'Content-Type': 'text/plain' },
			body: 'No se pudo encontrar registros.'
		}
	}
}

module.exports.update = async (event) => {
	try {
		const input = JSON.parse(event.body)
		const { Nave } = await connectToDatabase()
		const nave = await Nave.findByPk(event.pathParameters.id)
		if (!nave) throw new HTTPError(404, `El registro con id: ${event.pathParameters.id} no fue encontrado`)
		if (input.titulo) nave.titulo = input.titulo
		if (input.intro_apertura) nave.intro_apertura = input.intro_apertura
		await nave.save()
		return {
			statusCode: 200,
			body: JSON.stringify(nave)
		}
	} catch (err) {
		return {
			statusCode: err.statusCode || 500,
			headers: { 'Content-Type': 'text/plain' },
			body: err.message || 'No se pudo actualizar el registro'
		}
	}
}

module.exports.destroy = async (event) => {
	try {
		const { Nave } = await connectToDatabase()
		const nave = await Nave.findByPk(event.pathParameters.id)
		if (!nave) throw new HTTPError(404, `El registro con id: ${event.pathParameters.id} no fue encontrado`)
		await nave.destroy()
		return {
			statusCode: 200,
			body: JSON.stringify(nave)
		}
	} catch (err) {
		return {
			statusCode: err.statusCode || 500,
			headers: { 'Content-Type': 'text/plain' },
			body: err.message || 'No se pudo eliminar el registro.'
		}
	}
}