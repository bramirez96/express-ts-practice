import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (envFound.error) throw new Error("**!! Couldn't find .env file !!**");

export default {
  dbEnv: process.env.NODE_ENV,
  port: parseInt(process.env.PORT || '5000', 10),
  jwtSecret: process.env.JWT_SECRET || "you haven't set a secret",
  api: {
    prefix: '/api',
  },
  databaseUrl: process.env.DB_URL,
};
