import dotenv from 'dotenv';
import { Config } from 'knex';
dotenv.config({ path: '../../../.env' });

const knexConfig: { [key: string]: Config } = {
  development: {
    client: 'pg',
    connection: process.env.DB_URL,
    migrations: { directory: './migrations' },
    seeds: { directory: './seeds' },
    pool: { min: 2, max: 10 },
  },
};

export default knexConfig;
