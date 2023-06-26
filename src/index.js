import app from "./app";
import config from "./config";
import database from "./config/database";
import logger from "./config/logger";

const server = app.listen(config.port, () => {
  logger.info(`Server listening on port ${config.port}`);
});

database.connect();

const handleErrorExit = (error) => {
  logger.error(error);
  database.close(() => {
    logger.info("Database closed");
  });
  server.close(() => {
    logger.info("Server closed");
    process.exit(1);
  });
};

process.on("uncaughtException", handleErrorExit);
process.on("unhandledRejection", handleErrorExit);

["SIGTERM", "SIGINT"].forEach((signal) => {
  process.on(signal, () => {
    logger.info(`Received ${signal}. Closing the server and database`);
    database.close();
    server.close();
  });
});
