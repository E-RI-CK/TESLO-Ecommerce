# Descripción


## Prisma Installation

1. ```yarn add prisma --save-dev```
2. ```yarn add @prisma/client```
3. ```yarn prisma init --datasource-provider PostgreSQL```
4. ```yarn prisma migrate dev --name ProductCategory```

## Correr en dev

1. Clonar el repositorio.
2. Crear una copia del ```.env.template``` y renombrar a ```.env``` y cambiar las variables de entorno.
3. Instalar dependencias ```yarn```.
4. Levantar la base de datos ```docker compose up -d```.
5. Correr las migraciones de Prisma ```yarn prisma migrate dev```
6. Ejecutar seed ```yarn run seed```
7. Correr el proyecto ```yarn run dev```.


## Correr en prod