import commandLineArgs from 'command-line-args';
import path from 'path';
import dotenv from 'dotenv';
import winston from 'winston';

(() => {
  // Setup command line options
  const options = commandLineArgs([
    {
      name: 'env',
      alias: 'e',
      defaultValue: 'development',
      type: String,
    },
  ]);
  // Set the env file
  const result2 = dotenv.config({
    path: path.join(__dirname, `env/${options.env}.env`),
  });
  if (result2.error) {
    throw result2.error;
  }

  // Initialize logger
  const level = options.env == 'development' ? 'verbose' : 'info';
  const consoleTransport = new winston.transports.Console({
    level,
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.errors({ stack: true }),
      winston.format.json(),
    ),
  });
  winston.add(consoleTransport);

  process.on('uncaughtException', function (err) {
    winston.error('[boot] UNHANDLED EXCEPTION. ERROR:', err);
  });

  process.on('unhandledRejection', (reason, promise) => {
    winston.error(
      '[boot] UNHANDLED PROMISE REJECTION:' + promise + 'REASON:' + reason,
      reason,
    );
  });
})();
