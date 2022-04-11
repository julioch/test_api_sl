'use stricts'

let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000/dev/api';


describe('Insertar una pelicula: ',()=>{

	it('deberia insertar una pelicula', (done) => {
		chai.request(url)
			.post('/peliculas')
			.send({
                titulo: "Demo demo demo", 
                id_episodio: 7, 
                intro_apertura: "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle, Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, the DEATH\r\nSTAR, an armored space\r\nstation with enough power\r\nto destroy an entire planet.\r\n\r\nPursued by the Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans that can save her\r\npeople and restore\r\nfreedom to the galaxy....", 
                director: "George Lucas", 
                productor: "Gary Kurtz, Rick McCallum", 
                fecha_realizacion: "1977-05-25", 
                personajes: "['https://swapi.py4e.com/api/people/1/','https://swapi.py4e.com/api/people/2/', 'https://swapi.py4e.com/api/people/3/','https://swapi.py4e.com/api/people/4/', 'https://swapi.py4e.com/api/people/5/','https://swapi.py4e.com/api/people/6/', 'https://swapi.py4e.com/api/people/7/','https://swapi.py4e.com/api/people/8/', 'https://swapi.py4e.com/api/people/9/','https://swapi.py4e.com/api/people/10/', 'https://swapi.py4e.com/api/people/12/','https://swapi.py4e.com/api/people/13/', 'https://swapi.py4e.com/api/people/14/','https://swapi.py4e.com/api/people/15/', 'https://swapi.py4e.com/api/people/16/','https://swapi.py4e.com/api/people/18/', 'https://swapi.py4e.com/api/people/19/','https://swapi.py4e.com/api/people/81/']", 
                planetas: "['https://swapi.py4e.com/api/planets/1/','https://swapi.py4e.com/api/planets/2/', 'https://swapi.py4e.com/api/planets/3/']", 
                naves: "['https://swapi.py4e.com/api/starships/2/','https://swapi.py4e.com/api/starships/3/', 'https://swapi.py4e.com/api/starships/5/','https://swapi.py4e.com/api/starships/9/', 'https://swapi.py4e.com/api/starships/10/','https://swapi.py4e.com/api/starships/11/', 'https://swapi.py4e.com/api/starships/12/','https://swapi.py4e.com/api/starships/13/']", 
                vehiculos: "['https://swapi.py4e.com/api/vehicles/4/','https://swapi.py4e.com/api/vehicles/6/', 'https://swapi.py4e.com/api/vehicles/7/','https://swapi.py4e.com/api/vehicles/8/']", 
                especies: "['https://swapi.py4e.com/api/species/1/','https://swapi.py4e.com/api/species/2/', 'https://swapi.py4e.com/api/species/3/','https://swapi.py4e.com/api/species/4/', 'https://swapi.py4e.com/api/species/5/']",
                url: "https://swapi.py4e.com/api/films/1/"
            })
			.end( (err, res) =>{
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});
});

describe('Insertar una pelicula con error: ',()=>{

	it('deberia recibir un error', (done) => {
		chai.request(url)
			.post('/peliculas')
			.send({ director: "Lucas lucas" })
			.end( (err, res) =>{
				console.log(res.body)
				expect(res).to.have.status(400);
				done();
			});
	});

});

describe('listar todas las peliculas: ',()=>{

	it('deberia obtener todas las peliculas', (done) => {
		chai.request(url)
			.get('/peliculas')
			.end( (err, res) =>{
				console.log(res.body)
				expect(res).to.have.status(200);
				done();
			});
	});

});