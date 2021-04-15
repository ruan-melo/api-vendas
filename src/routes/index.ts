import { Router } from 'express';
import productsRouter from './ProductsRouter';
import usersRouter from './UsersRouter';
import sessionsRouter from './SessionsRouter';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

routes.get('/', (req, res) => {
  return res.json({ message: 'Hello Dev' });
});

export default routes;
