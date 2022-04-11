'use stricts'

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000/dev/api';


describe('Insertar una nave: ',()=>{

	it('deberia insertar una nave', (done) => {
		chai.request(url)
			.post('/naves')
			.send({
                nombre: "Demo demo demo", 
                modelo: "DS-1 Orbital Battle Station", 
                manufactura: "Imperial Department of Military Research, Sienar Fleet Systems", 
                costo_en_creditos: "1000000000000", 
                longitud: "120000", 
                velocidad_max_atmosfera: "n/a", 
                tripulacion: "342,953", 
                pasajeros: "843,342", 
                capacidad_carga: "1000000000000", 
                consumibles: "3 years", 
                rango_hiperimpulsor: "4.0", 
                mglt: "10", 
                clase_nave: "Deep Space Mobile Battlestation", 
                pilotos: "[]", 
                peliculas: "['https://swapi.py4e.com/api/films/1/']",
                url: "https://swapi.py4e.com/api/starships/9/"
            })
			.end( (err, res) =>{
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});
});

describe('Insertar una nave con error: ',()=>{

	it('deberia recibir un error', (done) => {
		chai.request(url)
			.post('/naves')
			.send({ manufactura: "Imperial Department" })
			.end( (err, res) =>{
				console.log(res.body)
				expect(res).to.have.status(400);
				done();
			});
	});

});

describe('listar todas las naves: ',()=>{

	it('deberia obtener todas las naves', (done) => {
		chai.request(url)
			.get('/naves')
			.end( (err, res) =>{
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});

});