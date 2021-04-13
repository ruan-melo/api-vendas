import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import AppError from './errors/AppError';
import createConnection from './database/';

createConnection();

const app = express();

process.title = 'api-vendas';

app.use(cors());
app.use(express.json());
app.use(routes);
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

export default app;
