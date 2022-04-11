## Instalación

Para este ejemplo use planetscale.com, un servicio muy bueno donde puedo usar una base de datos mysql (plan free), ademas de mocha y chai para test unitarios.

Instalar las dependencias.

```sh
cd test_api_sl
npm i
```

Tener en cuenta el archivo env.json para cambiar los datos por una base de datos mysql en planetscale o localhost. Teniendo los datos modificados, se puede lanzar la aplicacion.

```sh
serverless offline start
```

## Primer deploy

Si ya se tiene la cuenta de aws configurada, ejecutar el siguiente comando. Que subira todo a nuestra cuenta de aws.

```sh
serverless deploy
```

## Pruebas

Podemos realizar nuestra primera prueba de la API

raiz:

```sh
serverless invoke -f getAll -s dev
```

Personas:

```sh
serverless invoke -f getAllPersona -s dev
```
Tambien podemos usar Insomnia como tool para llamar las API, en este caso crear un registro para personas.

```sh
http://localhost:3000/dev/api/personas  metodo: POST

JSON
{
	"nombre": "Primero",
	"nacimiento": "57BBY",
	"color_ojo": "Azules",
	"genero": "Masculino",
	"color_cabello": "Rubio",
	"altura": "182",
	"peso": "77",
	"color_piel": "Fair",
	"mundo_natal": "https://api.com/api/planets/1/",
	"peliculas": "19 BBY",
	"especies": "[ 'https://api.com/api/species/1/']",
	"vechiculos": "['https://api.com/api/vehicles/14/','https://swapi.py4e.com/api/vehicles/30/']",
	"naves": "['https://api.com/api/starships/12/', 'https://api.com/api/starships/22/']",
	"url": "https://api.com/api/people/1/"
}
```