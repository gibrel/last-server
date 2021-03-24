## Description

  A permission/role based project using:
  <p>Nest, typeOrm, postgresql, swagger and docker.</p>

## Installation

```bash
$ npm i
```
Also remember to install `docker`.

## Running the app

First of all, set the configurations files `.env` and `tsconfig.json` (`ormconfig.json` is overwriten with scripts).
Then you can go:

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

Current default **{ADRESS}:{PORT}** default to watch is `localhost:8080`.
Swagger can be acessed by `{ADRESS}:{PORT}/docs`.


## TODO:

 - Fix some errors in crud (swagger is there to show me the way);
 - Add JTW layer of security and authorization;
 - Conect with front-end (yeah! A preaty React project!!!).
