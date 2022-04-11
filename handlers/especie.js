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
	const next = url + 'dev/api/especies/?page=' + (currentPage + 1)
	const previous = currentPage == 0 ? null : url  + 'dev/api/especies/?page=' + (currentPage - 1);

	return { count, next, previous, results };
}; 

function HTTPError (statusCode, message) {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}

module.exports.create = async (event) => {
	try {
		const { Especie } = await connectToDatabase()
		const especie = await Especie.create(JSON.parse(event.body))
		return {
			statusCode: 200,
			body: JSON.stringify(especie)
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
		const { Especie } = await connectToDatabase()
		const especie = await Especie.findByPk(event.pathParameters.id)
		if (!especie) throw new HTTPError(404, `El registro con id: ${event.pathParameters.id} no fue encontrado`)
		return {
			statusCode: 200,
			body: JSON.stringify(especie)
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

		const { Especie } = await connectToDatabase()
		const especies = await Especie.findAndCountAll({ where: condition, limit, offset })
		const url = process.env.HOST;
		const response = getPagingData(especies, page, limit, url);
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
		const { Especie } = await connectToDatabase()
		const especie = await Especie.findByPk(event.pathParameters.id)
		if (!especie) throw new HTTPError(404, `El registro con id: ${event.pathParameters.id} no fue encontrado`)
		if (input.titulo) especie.titulo = input.titulo
		if (input.intro_apertura) especie.intro_apertura = input.intro_apertura
		await especie.save()
		return {
			statusCode: 200,
			body: JSON.stringify(especie)
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
		const { Especie } = await connectToDatabase()
		const especie = await Especie.findByPk(event.pathParameters.id)
		if (!especie) throw new HTTPError(404, `El registro con id: ${event.pathParameters.id} no fue encontrado`)
		await especie.destroy()
		return {
			statusCode: 200,
			body: JSON.stringify(especie)
		}
	} catch (err) {
		return {
			statusCode: err.statusCode || 500,
			headers: { 'Content-Type': 'text/plain' },
			body: err.message || 'No se pudo eliminar el registro.'
		}
	}
}