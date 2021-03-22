## Description

  A permission/role based project using:
  <p>Nest, typeOrm, postgresql, swagger and docker</p>

## Installation

```bash
$ npm i
```
## Running the app

First of all, set the configurations files `.env` and `ormconfig.json`.

Remember to install your `docker`.

```bash
# start the postgres server within a docker image:
$ npm run start:dev:db

# configure the db migrations
$ npm run typeorm:migration:generate

# run db migrations
$ npm run typeorm:migration:run

# seed database
$ npm run start:dev:db:seed

# finally start your server
$ npm run start:dev
```
