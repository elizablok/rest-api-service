import { Sequelize } from 'sequelize';
import { db as dbConfig } from '../config';
import logger from '../config/logger';

import File from './file';
import Token from './token';
import User from './user';

const sequelize = new Sequelize(dbConfig.name, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.management_system,
});
sequelize.authenticate(() => logger.info('Database connected'));

const models = { File, Token, User };

for (const model in models) {
  models[model].associate(models);
}

export default { sequelize, Sequelize, models };
