# Survey Center

NodeJs APIs to serve as backend for anonymous surveys app

## Running the app

### docker version (recommended)

- This is the recommended way, since it will handle the database and migrations automatically.

- Make sure you have docker installed

- Run the app

```bash
yarn start:docker
```

### bare metal

- create `.env` file and add the `PG_URL` pointing to the postgres db

- Run the migrations using `yarn migration:run`

- Run the app

```bash
yarn start:dev
```

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
