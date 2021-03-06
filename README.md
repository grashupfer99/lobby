# Lobby

Engineering thesis - online system for matching students with topics.

### Prerequisites

* Node 8
* Docker

### Tech stack

* Node.js (runtime)
* Next.js + React (frontend)
* Koa (backend)
* PostgreSQL (database)
* Sequelize (ORM)
* JWT (Authentication)

### Setup

To install necessary dependencies:

```bash
npm install
```

### Development

```bash
npm run dev
```

This command will start both Dockerized Postgres container and Koa based
webserver (both frontend and backend).

Before doing any calls please setup database with `db_en.sql` file.

#### Defining ORM model

First, run command:

```bash
node_modules/.bin/sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string
```

Of course replace values with attributes of your choice.

This will create a model file in models folder

Then head to `models/<yourModelName.js>` and tweak it. Add constraints, keys,
indexes etc.

[More info here](http://docs.sequelizejs.com/manual/tutorial/models-definition.html)

## Deployment

Deployments are performed automatically with each and every push to master
branch.

Still, you can (but shouldn't) perform them manually with following command:

```bash
now -e DB_PASSWORD=@db_password -t <ZEIT_TOKEN> --public
```

## Tests
Before testing anything please run `npm run test:seed` to insert test data to the database. Also, make sure that DB is up and running.

### Unit 
Application uses Jest as a test runner.

`npm run test`

### Integration
Application uses Selenium + Nightwatch.js for Integration E2E tests.

1. Run `npm run dev` to start the application
2. In separate tab run `npm run test:nightwatch` to start tests suite


### Administration Panel

Application has a special administration panel for redefining consts, e.g. Skills and Promoters. To access it run `npm run dev` and `npm run admin`, then head to `http://localhost:1337` and use `admin:ADmin12` credentials.
