# Pokedex Web Application

## Descripción

Este proyecto es una aplicación web inspirada en el concepto de Pokedex de Pokémon. Permite a los usuarios ver una lista de Pokémones con su imagen y nombre, buscar Pokémones por nombre y agregarlos a favoritos. La aplicación es una solución fullstack, utilizando Angular v16 para el frontend y NestJS para el backend, con un contenedor Docker para facilitar su despliegue y ejecución.

## Características

- **Vista Principal**: Lista de Pokémones mostrando su imagen y nombre.
- **Búsqueda**: Capacidad para buscar Pokémones por nombre o Id. Muestra los resultados en la vista principal o una página 404 si no se encuentra el Pokémon.
- **Favoritos**: Opción para agregar Pokémones a favoritos, indicando visualmente cuáles son favoritos en la vista principal.

## Requisitos

- Docker instalado en tu máquina.

## Tecnologías Utilizadas

- **Frontend**: Angular v16
- **Backend**: NestJS
- **Base de Datos**: [PokeAPI](https://pokeapi.co/) para datos de Pokémon.
- **Contenedorización**: Docker

## Cómo Correr la Aplicación

1. Clona el repositorio a tu máquina local.
2. Asegúrate de tener Docker instalados.
3. Navega a la raíz del proyecto en tu terminal.
4. Ejecuta el siguiente comando para construir y levantar los servicios: `docker-compose up`.
5. Una vez que los contenedores estén corriendo, abre tu navegador y visita `http://localhost:4200` para acceder a la aplicación.

