import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors as celErrors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import routes from './routes';
import AppError from './errors/AppError';
import createConnection from './database/';
import uploadConfig from './config/upload';
import rateLimiter from './routes/middlewares/rateLimiter';
// import * as path from 'path';
// import * as dotenv from 'dotenv';

// dotenv.config({
//   path: process.cwd() + '/.env',
// });

createConnection();

const app = express();

process.title = 'api-vendas';

app.use(cors());
app.use(express.json());

app.use(rateLimiter);

app.use(pagination);

app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(celErrors());
app.use(
  (error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof AppError) {
      return response.status(error.statusCode).json({
        status: 'error',
        message: error.message,
      });
    }

    return response.status(500).json({
      status: 'Error',
      message: `Internal server error${error.message}`,
    });
  },
);

// s

export default app;
