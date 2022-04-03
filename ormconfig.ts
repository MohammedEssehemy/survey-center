import 'dotenv/config';
import path from 'path';
import { ConnectionOptions } from 'typeorm';

const PG_URL =
  process.env.PG_URL ||
  'postgres://postgres:postgres@127.0.0.1:5432/survey_center';

const dbConfig: ConnectionOptions = {
  type: 'postgres',
  url: PG_URL,
  entities: [path.join(__dirname, 'src', '**', 'entities', '*.entity.{ts,js}')],
  migrations: [
    path.join(__dirname, 'src', '**', 'migrations', '*.migration.{ts,js}'),
  ],
  synchronize: false,
  migrationsRun: false,
};

export default dbConfig;
