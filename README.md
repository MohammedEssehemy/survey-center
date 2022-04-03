# Survey Center

NodeJs APIs to serve as backend for anonymous surveys app, uses PostgreSQL for persistence.

## Running the app

### docker version (recommended)

- This is the recommended way, since it will handle the database and migrations automatically.

- Make sure you have docker installed

- Run the app

```bash
yarn start:docker
```

### bare metal

- copy `.env.example` to `.env` and change the `PG_URL` pointing to the PostgreSQL db

- Run the migrations using `yarn migration:run`

- Run the app

```bash
yarn start:dev
```

- Or run in debugging mode

```bash
yarn start:debug
```

### OpenAPI

- App starts on port 3000 by default

- call `localhost:3000/` to validate the server is up

- Navigate to `localhost:3000/docs` to get the openAPI docs or use the `swagger.json` in the project directory

## Test

```bash
yarn test
```

## Migrations

- Migrations are handled using [typeorm](https://github.com/typeorm/typeorm)

- To generate new migration, run the following:

```bash
yarn migration:generate -n <MIGRATION_NAME>
```

- To run pending migrations, run the following

```bash
yarn migration:run
```
