import { errors } from 'celebrate';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import createError, { HttpError } from 'http-errors';
import logger from 'morgan';
import routes from '../api';
import config from '../config';

export default async ({ server }: ExpressLoader): Promise<void> => {
  // Test Endpoints
  server.get('/status', (req, res) => {
    res.status(200).end();
  });
  server.head('/status', (req, res) => {
    res.status(200).end();
  });

  // Middleware Packages
  server.use(helmet());
  server.use(express.json());
  server.use(cors({ origin: '*' }));
  server.use(express.urlencoded({ extended: false }));
  server.use(logger('dev'));

  // Load API Routes
  server.use(config.api.prefix, routes());

  // Pass Invalid Routes to Error Handler
  server.use((req, res, next) => next(createError(404, 'Not Found')));

  // Handle Celebration Validation Errors
  server.use(errors());

  // Handle All Errors
  server.use(
    (err: HttpError, req: Request, res: Response, next: NextFunction) => {
      const statusCode = err.status || 500;
      const message = err.message || 'Something went wrong.';
      res.status(statusCode).json({ statusCode, message });

      // This line shuts up the linter and never runs
      if (false) next();
    },
  );
};

interface ExpressLoader {
  server: express.Application;
}
