La aplicacion se divide en las siguientes secciones siguiendo los patrones de CLEAN ARCHITECTURE.

## CONFIG

En esta sección se agrupan las adpataciones de librerias de terceros, esto con el objetivo de no ser dependientes de las mismas, y en caso de tener una actualización o cambio de libreria, lo mismo no provoque un efecto domino en el resto del código, por ello no se usa las librerias (jwt, bcrypt, envs, etc) de manera directa, sino mediante una adapatación de las mismas.

## DATA

En esta sección se configura la adaptación de la conexion con distintas BASES DE DATOS, para que en caso de hacer un cambio de las mismas, solo tenga que modificarse el código en esta sección y algunos cambios en la sección INFRAESTRUCTURE, el resto de la aplicación no depende directamente de las BASES DE DATOS.

## DOMAIN

Son las reglas de negocio de nuestra aplicación. Es totalmente agnostico de librerias de terceros, todo aqui debe ser código totalmente nuestro.

### DATASOURCES

Aqui se define las reglas de como debe de lucir nuestros DATASOURCES o fuentes de datos, como estan estructurados y que reglas deben cumplir.

### DTOS

Son reglas que definen como deben ser nuestros OBJETOS, esto con el objetivo de poder moverlos de un lugar a otro, ademas incluyen las validaciones de los mismos.

### ENTITIES

Son muy similares a como guardaremos los datos en la base de datos, el objetivo de abstraerlos es que si existe alguna modificación en un nombre de campo en la base de datos, no provoque un efecto domino en toda la aplicación.

### ERRORS

Reglas para manejar y gestionar los errores, 401, 404, 500, etc.

### USE CASES

Son los casos de uso, para cada uno, aqui se indica que hacer o que llamar, que dependencias e inyeccion de dependencias necesitamos utilizar para realizar algo.

## INFRAESTRUCTURE

Son implementaciones del DOMAIN.

### DATASOURCE

Son las implementaciones del DATASOURCE, aqui es donde realmente se realiza el código, aqui se modifica todo para que funcione.

### MAPPERS

Tranforma la data que recibimos en la data que necesitamos, como ser un objeto en una entidad, aunque tambien podriamos recibir objetos XML, JSON, etc.

### REPOSITORIES

Son un puente (una abstracción) entre nuestro código con el datasource, para evitar que cuando haya un cambio en el DATASOURCe tengamo que modificar distintas partes de nuestro código.

## PRESENTATION

En esta seccion se engloba lo mas cercano a quienes consumiran el servicio, es la capa externa, lo que verá el usuario final.

Aqui es donde estaria incluido los frameworks frontend (React, Angular, Vue, etc).

Dentro de cada módulo estan incluidas la rutas y controllers.

En la ruta cada accion debe llamar a un caso de uso, el mismo que debe llamar a una funcion del controller, por ejemplo: login, registro, etc.

### AUTH

todo lo relacionado a la autenticación

### MIDDLEWARES

Pasos intermedios en las rutas, por ejemplo, aqui podemos controlar la existencia y vigencia de Tokens
