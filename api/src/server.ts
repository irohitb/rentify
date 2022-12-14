import morgan from 'morgan';
import json from 'morgan-json';
import helmet from 'helmet';
import cors from 'cors';

import express, { NextFunction, Request, Response } from 'express';
import promMid from 'express-prometheus-middleware';
import Prometheus from 'prom-client';
import StatusCodes from 'http-status-codes';
import 'express-async-errors';
import winston from 'winston';

import { isEmpty } from 'lodash';
import { IncomingMessage } from 'http';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

interface IncomingMessageWithBody extends IncomingMessage {
  body: JSON;
}

morgan.token('headers', function (req: IncomingMessageWithBody, _res) {
  return JSON.stringify(req.headers);
});

morgan.token('body', (req: IncomingMessageWithBody, _res) => {
  return JSON.stringify(req.body);
});

const jsonFormat = json(
  ':method :url :status :res[content-length] bytes :response-time ms :headers :body',
);

app.use(
  morgan(jsonFormat, {
    stream: {
      write: (message) => {
        let jsonMessage = JSON.parse(message);

        if (!isEmpty(jsonMessage['headers'])) {
          jsonMessage = {
            ...jsonMessage,
            headers: JSON.parse(jsonMessage['headers']),
          };
        }

        if (!isEmpty(jsonMessage['body'])) {
          jsonMessage = {
            ...jsonMessage,
            body: JSON.parse(jsonMessage['body']),
          };
        }

        if (jsonMessage.status.match(/[2-3]0+/)) {
          winston.info('', jsonMessage);
        } else {
          winston.error('', jsonMessage);
        }
      },
    },
    skip: function (req, _res) {
      if (process.env.NODE_ENV === 'development') {
        return (
          req.url === '/healthz' ||
          req.url === '/serviceSmsQueue' ||
          req.url === '/servicePushQueue' ||
          req.url === '/auth/dispatcher/clearExpiredDispatcherSessionsAsDriver'
        );
      } else {
        return false;
      }
    },
  }),
);

// Security
if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

// Metrics
app.use(
  promMid({
    metricsPath: '/metrics',
    collectDefaultMetrics: true,
    requestDurationBuckets: Prometheus.exponentialBuckets(0.125, 2, 8),
  }),
);

// Print API errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  winston.error('An error occurred.', { message: err.message });
  return res.status(StatusCodes.StatusCodes.INTERNAL_SERVER_ERROR).json({
    error: err.message,
  });
});

// Export express instance
export default app;
