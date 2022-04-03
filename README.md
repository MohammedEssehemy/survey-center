# Survey Center

NodeJs APIs to serve as backend for anonymous surveys app

## Running the app

### docker version

- you must have Docker installed

```bash
yarn start:docker
```

### bare metal

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
