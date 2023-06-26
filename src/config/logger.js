import { createLogger, format, transports } from 'winston';
import config from './index';

export default createLogger({
  format: format.combine(
    config.env === 'production' ? format.uncolorize() : format.colorize(),
    format.printf(({ level, message }) => `${level}: ${message}`)
  ),
  transports: [
    new transports.Console({
      stderrLevels: ['error'],
    }),
  ],
});
