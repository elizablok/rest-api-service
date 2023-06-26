import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVars = process.env;

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
  },
  db: {
    development: {
      name: envVars.DB_DEV_NAME,
      user: envVars.DB_DEV_USER,
      password: envVars.DB_DEV_PASS,
      host: envVars.DB_DEV_HOST,
      management_system: envVars.DB_DEV_MS,
      pool: {
        max: envVars.DB_DEV_POOL_MAX,
        min: envVars.DB_DEV_POOL_MIN,
        acquire: envVars.DB_DEV_POOL_ACQUIRE,
        idle: envVars.DB_DEV_POOL_IDLE,
      },
    },
    test: {
      name: envVars.DB_TEST_NAME,
      user: envVars.DB_TEST_USER,
      password: envVars.DB_TEST_PASS,
      host: envVars.DB_TEST_HOST,
      management_system: envVars.DB_TEST_MS,
    },
    production: {
      name: envVars.DB_PROD_NAME,
      user: envVars.DB_PROD_USER,
      password: envVars.DB_PROD_PASS,
      host: envVars.DB_PROD_HOST,
      management_system: envVars.DB_PROD_MS,
    },
  },
};
