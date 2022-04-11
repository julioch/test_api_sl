'use stricts'

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000/dev/api';


describe('Insertar una persona: ',()=>{

	it('deberia insertar una persona', (done) => {
		chai.request(url)
			.post('/personas')
			.send({
                nombre: "demo demo",
                nacimiento: "57BBY",
                color_ojo: "Azules",
                genero: "Masculino",
                color_cabello: "Rubio",
                altura: "182",
                peso: "77",
                color_piel: "Fair",
                mundo_natal: "https://swapi.py4e.com/api/planets/1/",
                peliculas: "19 BBY",
                especies: "[ 'https://swapi.py4e.com/api/species/1/']",
                vechiculos: "['https://swapi.py4e.com/api/vehicles/14/','https://swapi.py4e.com/api/vehicles/30/']",
                naves: "['https://swapi.py4e.com/api/starships/12/', 'https://swapi.py4e.com/api/starships/22/']",
                url: "https://swapi.py4e.com/api/people/1/"
            })
			.end( (err, res) =>{
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});
});

describe('Insertar una persona con error: ',()=>{

	it('deberia recibir un error', (done) => {
		chai.request(url)
			.post('/personas')
			.send({ color_ojo: "Azules" })
			.end( (err, res) =>{
				console.log(res.body)
				expect(res).to.have.status(400);
				done();
			});
	});

});

describe('listar todas las personas: ',()=>{

	it('deberia obtener todas las personas', (done) => {
		chai.request(url)
			.get('/personas')
			.end( (err, res) =>{
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});

});